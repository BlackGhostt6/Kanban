(() => {
  "use strict";

  const DEFAULT_COLORS = {
    todo: "#5776aa",
    progress: "#bd7d29",
    done: "#27765b"
  };

  function getClient() {
    if (!window.KanbanSupabase || !window.KanbanSupabase.client) {
      throw new Error("Não foi possível conectar ao serviço de dados. Recarregue a página.");
    }
    return window.KanbanSupabase.client;
  }

  function throwIfError(error) {
    if (error) throw new Error(error.message || "O serviço de dados retornou um erro.");
  }

  function toTask(row) {
    return {
      id: row.id,
      boardId: row.board_id,
      userId: row.user_id,
      title: row.title,
      description: row.description,
      status: row.status,
      dueDate: row.due_date || null,
      priority: row.priority || "media",
      assigneeId: row.assignee_id || null,
      storyPoints: row.story_points ?? null,
      sprintId: row.sprint_id || null,
      backlog: Boolean(row.backlog),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  function toBoard(row) {
    return {
      id: row.id,
      ownerId: row.owner_id,
      name: row.name,
      description: row.description || "",
      createdAt: row.created_at
    };
  }

  async function getProfilesByIds(client, userIds) {
    const ids = [...new Set(userIds.filter(Boolean))];
    if (!ids.length) return new Map();

    const { data, error } = await client
      .from("profiles")
      .select("id, name, username")
      .in("id", ids);
    throwIfError(error);
    return new Map((data || []).map(profile => [
      profile.id,
      { name: profile.name, username: profile.username }
    ]));
  }

  async function ensureDefaultBoard() {
    const client = getClient();
    const { data: userData, error: userError } = await client.auth.getUser();
    throwIfError(userError);
    if (!userData || !userData.user || !userData.user.id) {
      throw new Error("Sua sessão expirou. Entre novamente para carregar seus quadros.");
    }

    const { data: existingBoard, error: existingError } = await client
      .from("boards")
      .select("id, owner_id, name, description, created_at")
      .eq("owner_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    throwIfError(existingError);

    if (existingBoard) return toBoard(existingBoard);

    const { data, error } = await client
      .from("boards")
      .insert({
        owner_id: userData.user.id,
        name: "Meu quadro",
        description: "Quadro principal"
      })
      .select("id, owner_id, name, description, created_at")
      .single();
    throwIfError(error);

    const defaultColumns = [
      { board_id: data.id, key: "todo", name: "A Fazer", sort_order: 1, wip_limit: null },
      { board_id: data.id, key: "progress", name: "Em Andamento", sort_order: 2, wip_limit: null },
      { board_id: data.id, key: "done", name: "Concluído", sort_order: 3, wip_limit: null }
    ];

    const { error: columnError } = await client.from("board_columns").insert(defaultColumns);
    throwIfError(columnError);

    return toBoard(data);
  }

  async function getBoards() {
    const client = getClient();
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) return [];

    const [ownedResult, sharedResult] = await Promise.all([
      client
        .from("boards")
        .select("id, owner_id, name, description, created_at")
        .eq("owner_id", userData.user.id),
      client
        .from("board_members")
        .select("board_id")
        .eq("user_id", userData.user.id)
    ]);
    throwIfError(ownedResult.error);
    throwIfError(sharedResult.error);

    const owned = (ownedResult.data || []).map(toBoard);
    const memberBoardIds = (sharedResult.data || []).map(entry => entry.board_id);
    const sharedBoards = memberBoardIds.length
      ? await client
          .from("boards")
          .select("id, owner_id, name, description, created_at")
          .in("id", memberBoardIds)
      : { data: [] };
    throwIfError(sharedBoards.error);

    const merged = [...owned, ...((sharedBoards.data || []).map(toBoard))];
    const deduped = [];
    const seen = new Set();
    merged.forEach(board => {
      if (!seen.has(board.id)) {
        seen.add(board.id);
        deduped.push(board);
      }
    });
    return deduped;
  }

  async function createBoard(name, description = "") {
    const client = getClient();
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) throw new Error("Você precisa estar autenticado para criar um quadro.");

    const payload = {
      owner_id: userData.user.id,
      name: (name || "Meu quadro").trim(),
      description: (description || "").trim()
    };
    if (!payload.name) throw new Error("Informe um nome para o quadro.");

    const { data, error } = await client
      .from("boards")
      .insert(payload)
      .select("id, owner_id, name, description, created_at")
      .single();
    throwIfError(error);

    const { error: colError } = await client.from("board_columns").insert([
      { board_id: data.id, key: "todo", name: "A Fazer", sort_order: 1, wip_limit: null },
      { board_id: data.id, key: "progress", name: "Em Andamento", sort_order: 2, wip_limit: null },
      { board_id: data.id, key: "done", name: "Concluído", sort_order: 3, wip_limit: null }
    ]);
    throwIfError(colError);

    return toBoard(data);
  }

  async function getBoardMembers(boardId) {
    const client = getClient();
    const { data, error } = await client
      .from("board_members")
      .select("id, board_id, user_id, email, role, invited_by, created_at")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });
    throwIfError(error);
    const profiles = await getProfilesByIds(client, (data || []).map(row => row.user_id));
    return (data || []).map(row => ({
      id: row.id,
      boardId: row.board_id,
      userId: row.user_id,
      email: row.email,
      role: row.role,
      createdAt: row.created_at,
      profile: profiles.get(row.user_id) || null
    }));
  }

  async function inviteMember(boardId, email, role = "VIEWER") {
    const client = getClient();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail) throw new Error("Informe um e-mail para convidar alguém.");
    if (!/[\w\.-]+@[\w\.-]+\.[A-Za-z]{2,}/.test(normalizedEmail)) throw new Error("Informe um e-mail válido.");

    const { data: userData } = await client.auth.getUser();
    if (!userData.user) throw new Error("Você precisa estar autenticado para convidar membros.");

    const { data: memberProfile } = await client
      .from("profiles")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    const { data, error } = await client
      .from("board_members")
      .upsert({
        board_id: boardId,
        user_id: memberProfile ? memberProfile.id : null,
        email: normalizedEmail,
        role,
        invited_by: userData.user.id
      }, { onConflict: "board_id,email" })
      .select("id, board_id, user_id, email, role, created_at")
      .single();
    throwIfError(error);
    return data;
  }

  async function removeMember(boardId, memberId) {
    const client = getClient();
    const { error } = await client.from("board_members").delete().eq("board_id", boardId).eq("id", memberId);
    throwIfError(error);
  }

  async function updateMemberRole(boardId, memberId, role) {
    const client = getClient();
    const { data, error } = await client
      .from("board_members")
      .update({ role })
      .eq("board_id", boardId)
      .eq("id", memberId)
      .select("id, board_id, user_id, email, role")
      .single();
    throwIfError(error);
    return data;
  }

  async function getBoardColumns(boardId) {
    const client = getClient();
    const { data, error } = await client
      .from("board_columns")
      .select("id, board_id, key, name, sort_order, wip_limit")
      .eq("board_id", boardId)
      .order("sort_order", { ascending: true });
    throwIfError(error);
    return (data || []).map(item => ({
      id: item.id,
      boardId: item.board_id,
      key: item.key,
      name: item.name,
      sortOrder: item.sort_order,
      wipLimit: item.wip_limit
    }));
  }

  async function upsertBoardColumns(boardId, columns) {
    const client = getClient();
    const payload = columns.map((column, index) => ({
      id: column.id || null,
      board_id: boardId,
      key: column.key || `column-${index + 1}`,
      name: column.name,
      sort_order: column.sortOrder ?? index + 1,
      wip_limit: column.wipLimit ?? null
    }));
    const { error } = await client.from("board_columns").upsert(payload, { onConflict: "id" });
    throwIfError(error);
  }

  async function getTasks(boardId) {
    const client = getClient();
    const { data, error } = await client
      .from("tasks")
      .select("id, board_id, user_id, title, description, status, due_date, priority, assignee_id, story_points, sprint_id, backlog, created_at, updated_at")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });
    throwIfError(error);
    return (data || []).map(toTask);
  }

  async function createTask(task) {
    const client = getClient();
    if (!task || !task.boardId || !task.userId) {
      throw new Error("Não foi possível criar a tarefa: o quadro ou o usuário não foi carregado.");
    }
    const payload = {
      board_id: task.boardId,
      user_id: task.userId,
      title: task.title,
      description: task.description || "",
      status: task.status || "todo",
      due_date: task.dueDate || null,
      priority: task.priority || "media",
      assignee_id: task.assigneeId || null,
      story_points: task.storyPoints ?? null,
      sprint_id: task.sprintId || null,
      backlog: Boolean(task.backlog)
    };

    const { data, error } = await client
      .from("tasks")
      .insert(payload)
      .select("id, board_id, user_id, title, description, status, due_date, priority, assignee_id, story_points, sprint_id, backlog, created_at, updated_at")
      .single();
    throwIfError(error);
    return toTask(data);
  }

  async function updateTask(taskId, changes) {
    const client = getClient();
    const payload = {
      ...changes,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await client
      .from("tasks")
      .update(payload)
      .eq("id", taskId)
      .select("id, board_id, user_id, title, description, status, due_date, priority, assignee_id, story_points, sprint_id, backlog, created_at, updated_at")
      .single();
    throwIfError(error);
    return toTask(data);
  }

  async function deleteTask(taskId) {
    const client = getClient();
    const { data, error } = await client
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select("id")
      .single();
    throwIfError(error);
    return data.id;
  }

  async function getTaskDetails(taskId) {
    const client = getClient();
    const { data: taskRow, error: taskError } = await client
      .from("tasks")
      .select("id, board_id, user_id, title, description, status, due_date, priority, assignee_id, story_points, sprint_id, backlog, created_at, updated_at")
      .eq("id", taskId)
      .single();
    throwIfError(taskError);

    const [comments, checklist, labels, activities, acceptanceCriteria, definitionOfDone] = await Promise.all([
      client.from("task_comments").select("id, task_id, user_id, content, created_at").eq("task_id", taskId).order("created_at", { ascending: true }),
      client.from("task_checklist_items").select("id, task_id, title, done, created_at").eq("task_id", taskId).order("created_at", { ascending: true }),
      client.from("task_labels").select("id, task_id, label").eq("task_id", taskId),
      client.from("task_activities").select("id, board_id, task_id, user_id, action, description, created_at").eq("task_id", taskId).order("created_at", { ascending: false }),
      client.from("acceptance_criteria").select("id, task_id, description, done, created_at").eq("task_id", taskId).order("created_at", { ascending: true }),
      client.from("definition_of_done").select("id, task_id, description, done, created_at").eq("task_id", taskId).order("created_at", { ascending: true })
    ]);

    const profiles = await getProfilesByIds(client, [
      taskRow.assignee_id,
      ...(comments.data || []).map(item => item.user_id)
    ]);
    const task = toTask(taskRow);
    return {
      task,
      comments: (comments.data || []).map(item => {
        const profile = profiles.get(item.user_id);
        return {
          id: item.id,
          userId: item.user_id,
          content: item.content,
          createdAt: item.created_at,
          author: profile ? `${profile.name} (@${profile.username})` : "Usuário"
        };
      }),
      checklist: (checklist.data || []).map(item => ({
        id: item.id,
        taskId: item.task_id,
        title: item.title,
        done: Boolean(item.done),
        createdAt: item.created_at
      })),
      labels: (labels.data || []).map(item => item.label),
      activities: (activities.data || []).map(item => ({
        id: item.id,
        action: item.action,
        description: item.description,
        createdAt: item.created_at
      })),
      acceptanceCriteria: (acceptanceCriteria.data || []).map(item => ({
        id: item.id,
        description: item.description,
        done: Boolean(item.done),
        createdAt: item.created_at
      })),
      definitionOfDone: (definitionOfDone.data || []).map(item => ({
        id: item.id,
        description: item.description,
        done: Boolean(item.done),
        createdAt: item.created_at
      })),
      assignee: profiles.get(taskRow.assignee_id) || null,
      labelsList: (labels.data || []).map(item => item.label)
    };
  }

  async function addTaskComment(taskId, content) {
    const client = getClient();
    const text = String(content || "").trim();
    if (!text) throw new Error("Escreva um comentário antes de salvar.");
    const { data, error } = await client
      .from("task_comments")
      .insert({ task_id: taskId, content: text })
      .select("id, task_id, user_id, content, created_at").single();
    throwIfError(error);
    return data;
  }

  async function addChecklistItem(taskId, title) {
    const client = getClient();
    const text = String(title || "").trim();
    if (!text) throw new Error("Informe o nome da subtarefa.");
    const { data, error } = await client
      .from("task_checklist_items")
      .insert({ task_id: taskId, title: text, done: false })
      .select("id, task_id, title, done, created_at")
      .single();
    throwIfError(error);
    return data;
  }

  async function toggleChecklistItem(itemId, done) {
    const client = getClient();
    const { data, error } = await client
      .from("task_checklist_items")
      .update({ done })
      .eq("id", itemId)
      .select("id, task_id, title, done, created_at")
      .single();
    throwIfError(error);
    return data;
  }

  async function addTaskLabel(taskId, label) {
    const client = getClient();
    const { data, error } = await client
      .from("task_labels")
      .upsert({ task_id: taskId, label }, { onConflict: "task_id,label" })
      .select("id, task_id, label")
      .single();
    throwIfError(error);
    return data;
  }

  async function removeTaskLabel(taskId, label) {
    const client = getClient();
    const { error } = await client.from("task_labels").delete().eq("task_id", taskId).eq("label", label);
    throwIfError(error);
  }

  async function addAcceptanceCriterion(taskId, description) {
    const client = getClient();
    const text = String(description || "").trim();
    if (!text) throw new Error("Informe o critério de aceitação.");
    const { data, error } = await client
      .from("acceptance_criteria")
      .insert({ task_id: taskId, description: text, done: false })
      .select("id, task_id, description, done").single();
    throwIfError(error);
    return data;
  }

  async function updateAcceptanceCriterion(id, done) {
    const client = getClient();
    const { data, error } = await client
      .from("acceptance_criteria")
      .update({ done })
      .eq("id", id)
      .select("id, task_id, description, done").single();
    throwIfError(error);
    return data;
  }

  async function addDefinitionOfDone(taskId, description) {
    const client = getClient();
    const text = String(description || "").trim();
    if (!text) throw new Error("Informe o critério de definição de pronto.");
    const { data, error } = await client
      .from("definition_of_done")
      .insert({ task_id: taskId, description: text, done: false })
      .select("id, task_id, description, done")
      .single();
    throwIfError(error);
    return data;
  }

  async function updateDefinitionOfDone(id, done) {
    const client = getClient();
    const { data, error } = await client
      .from("definition_of_done")
      .update({ done })
      .eq("id", id)
      .select("id, task_id, description, done")
      .single();
    throwIfError(error);
    return data;
  }

  async function getBoardActivity(boardId) {
    const client = getClient();
    const { data, error } = await client
      .from("task_activities")
      .select("id, board_id, task_id, user_id, action, description, created_at")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false })
      .limit(30);
    throwIfError(error);
    return (data || []).map(item => ({
      id: item.id,
      action: item.action,
      description: item.description,
      createdAt: item.created_at
    }));
  }

  async function logActivity(boardId, taskId, action, description) {
    const client = getClient();
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) return null;
    const { data, error } = await client.from("task_activities").insert({
      board_id: boardId,
      task_id: taskId,
      user_id: userData.user.id,
      action,
      description
    }).select("id, board_id, task_id, user_id, action, description, created_at").single();
    if (error) return null;
    return data;
  }

  window.KanbanStorage = Object.freeze({
    DEFAULT_COLORS,
    ensureDefaultBoard,
    getBoards,
    createBoard,
    getBoardMembers,
    inviteMember,
    removeMember,
    updateMemberRole,
    getBoardColumns,
    upsertBoardColumns,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails,
    addTaskComment,
    addChecklistItem,
    toggleChecklistItem,
    addTaskLabel,
    removeTaskLabel,
    addAcceptanceCriterion,
    updateAcceptanceCriterion,
    addDefinitionOfDone,
    updateDefinitionOfDone,
    getBoardActivity,
    logActivity
  });
})();
