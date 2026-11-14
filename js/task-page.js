(() => {
  "use strict";

  async function main() {
    const currentUser = await window.KanbanAuth.requireSession();
    if (!currentUser) return;

    const taskId = new URLSearchParams(window.location.search).get("id");
    if (!taskId) {
      document.getElementById("task-title").textContent = "Tarefa não encontrada";
      return;
    }

    const taskTitleEl = document.getElementById("task-title");
    const taskDescriptionEl = document.getElementById("task-description");
    const checklistListEl = document.getElementById("checklist-list");
    const commentsListEl = document.getElementById("comments-list");
    const acceptanceListEl = document.getElementById("acceptance-list");
    const dodListEl = document.getElementById("dod-list");
    const activityListEl = document.getElementById("activity-list");
    const taskStatusEl = document.getElementById("task-status");
    const taskPriorityEl = document.getElementById("task-priority");
    const taskDueDateEl = document.getElementById("task-due-date");
    const taskAssigneeEl = document.getElementById("task-assignee");
    const taskStoryPointsEl = document.getElementById("task-story-points");
    const taskLabelsEl = document.getElementById("task-labels");
    const checklistFormEl = document.getElementById("checklist-form");
    const checklistPermissionNote = document.getElementById("checklist-permission-note");
    const openInBoardButton = document.getElementById("open-in-board");
    const breakSubtasksButton = document.getElementById("break-subtasks-button");
    const aiSubtasksModal = document.getElementById("ai-subtasks-modal");
    const aiSubtasksList = document.getElementById("ai-subtasks-list");
    const aiSubtasksStatus = document.getElementById("ai-subtasks-status");
    const aiSubtasksSave = document.getElementById("ai-subtasks-save");
    const logoutButton = document.getElementById("logout-button");
    let taskInfo = null;
    let boardMembers = [];
    let canEditChecklist = false;

    function formatDate(value) {
      if (!value) return "Não definido";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
    }

    async function recordTaskActivity(action, description) {
      if (!taskInfo || !taskInfo.task) return;
      return window.KanbanStorage.logActivity(taskInfo.task.boardId, taskId, action, description);
    }

    async function updateTaskField(changes, description) {
      await window.KanbanStorage.updateTask(taskId, changes);
      await recordTaskActivity("task_updated", description);
      await loadTask();
    }

    function renderChecklist(items) {
      checklistListEl.replaceChildren();
      if (!items.length) {
        checklistListEl.innerHTML = '<div class="check-item"><span>Nenhuma subtarefa adicionada.</span></div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "check-item";
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(item.done);
        checkbox.disabled = !canEditChecklist;
        checkbox.addEventListener("change", async () => {
          try {
            await window.KanbanStorage.toggleChecklistItem(item.id, checkbox.checked);
          } catch (error) {
            checkbox.checked = Boolean(item.done);
            checklistPermissionNote.textContent = error.message || "Não foi possível atualizar o checklist.";
            checklistPermissionNote.hidden = false;
            return;
          }
          item.done = checkbox.checked;
          try {
            const activity = await recordTaskActivity("task_updated", `Checklist da tarefa “${taskInfo.task.title}” atualizado.`);
            if (activity) {
              taskInfo.activities.unshift({
                id: activity.id,
                action: activity.action,
                description: activity.description,
                createdAt: activity.created_at
              });
              renderActivity(taskInfo.activities);
            } else {
              console.error("O checklist foi atualizado, mas a atividade não foi registrada.");
            }
          } catch (error) {
            console.error("O checklist foi atualizado, mas a atividade não foi registrada.", error);
          }
        });
        const text = document.createElement("span");
        text.textContent = item.title;
        label.append(checkbox, text);
        row.appendChild(label);
        checklistListEl.appendChild(row);
      });
    }

    function renderComments(items) {
      commentsListEl.replaceChildren();
      if (!items.length) {
        commentsListEl.innerHTML = '<div class="comment-item"><strong>Sem comentários ainda.</strong></div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "comment-item";
        const meta = document.createElement("div");
        meta.className = "comment-meta";
        meta.innerHTML = `<span>${item.author}</span><span>${formatDate(item.createdAt)}</span>`;
        const text = document.createElement("p");
        text.textContent = item.content;
        row.append(meta, text);
        commentsListEl.appendChild(row);
      });
    }

    function renderAcceptance(items) {
      acceptanceListEl.replaceChildren();
      if (!items.length) {
        acceptanceListEl.innerHTML = '<div class="criteria-item">Nenhum critério de aceite cadastrado.</div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "criteria-item";
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(item.done);
        checkbox.addEventListener("change", async () => {
          await window.KanbanStorage.updateAcceptanceCriterion(item.id, checkbox.checked);
          await recordTaskActivity("task_updated", `Critérios de aceite da tarefa “${taskInfo.task.title}” atualizados.`);
          await loadTask();
        });
        label.append(checkbox, document.createTextNode(" " + item.description));
        row.appendChild(label);
        acceptanceListEl.appendChild(row);
      });
    }

    function renderDoD(items) {
      dodListEl.replaceChildren();
      if (!items.length) {
        dodListEl.innerHTML = '<div class="dod-item">Nenhum critério de Definition of Done.</div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "dod-item";
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(item.done);
        checkbox.addEventListener("change", async () => {
          await window.KanbanStorage.updateDefinitionOfDone(item.id, checkbox.checked);
          await recordTaskActivity("task_updated", `Definition of Done da tarefa “${taskInfo.task.title}” atualizado.`);
          await loadTask();
        });
        label.append(checkbox, document.createTextNode(" " + item.description));
        row.appendChild(label);
        dodListEl.appendChild(row);
      });
    }

    function renderActivity(items) {
      activityListEl.replaceChildren();
      if (!items.length) {
        activityListEl.innerHTML = '<div class="comment-item">Nenhuma atividade registrada.</div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "comment-item";
        const meta = document.createElement("div");
        meta.className = "comment-meta";
        meta.innerHTML = `<span>${item.action}</span><span>${formatDate(item.createdAt)}</span>`;
        const desc = document.createElement("p");
        desc.textContent = item.description;
        row.append(meta, desc);
        activityListEl.appendChild(row);
      });
    }

    function renderLabels(labels) {
      taskLabelsEl.replaceChildren();
      const availableLabels = ["Bug", "Feature", "Urgente"];
      availableLabels.forEach(label => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "small-button";
        button.textContent = label;
        button.style.borderColor = labels.includes(label) ? "#27765b" : "#dfe4df";
        button.style.background = labels.includes(label) ? "#e8f3ed" : "#fff";
        button.addEventListener("click", async () => {
          if (labels.includes(label)) {
            await window.KanbanStorage.removeTaskLabel(taskInfo.task.id, label);
          } else {
            await window.KanbanStorage.addTaskLabel(taskInfo.task.id, label);
          }
          await recordTaskActivity("task_updated", `Labels da tarefa “${taskInfo.task.title}” atualizadas.`);
          await loadTask();
        });
        taskLabelsEl.appendChild(button);
      });
    }

    function closeSubtasksModal() {
      aiSubtasksModal.hidden = true;
      document.body.style.overflow = "";
    }

    function updateSubtaskSelection() {
      const selectedCount = aiSubtasksList.querySelectorAll("input[type='checkbox']:checked").length;
      aiSubtasksSave.disabled = selectedCount === 0 || !canEditChecklist;
      aiSubtasksSave.textContent = selectedCount && !canEditChecklist
        ? "Somente leitura"
        : selectedCount
        ? `Adicionar selecionadas (${selectedCount})`
        : "Adicionar selecionadas";
    }

    function renderSubtaskSuggestions(items) {
      aiSubtasksList.replaceChildren();
      items.forEach(title => {
        const label = document.createElement("label");
        label.className = "ai-subtask-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = title;
        checkbox.addEventListener("change", () => {
          label.classList.toggle("is-selected", checkbox.checked);
          updateSubtaskSelection();
        });
        const text = document.createElement("span");
        text.textContent = title;
        label.append(checkbox, text);
        aiSubtasksList.appendChild(label);
      });
      updateSubtaskSelection();
    }

    async function loadTask() {
      taskInfo = await window.KanbanStorage.getTaskDetails(taskId);
      const task = taskInfo.task;
      taskTitleEl.textContent = task.title;
      taskDescriptionEl.textContent = task.description || "Sem descrição detalhada.";
      document.title = `${task.title} | Dayboard`;
      taskStatusEl.value = task.status;
      taskPriorityEl.value = task.priority;
      taskDueDateEl.value = task.dueDate || "";
      taskStoryPointsEl.value = task.storyPoints ?? "";

      const boardId = task.boardId;
      const [availableBoards, members] = await Promise.all([
        window.KanbanStorage.getBoards(),
        window.KanbanStorage.getBoardMembers(boardId)
      ]);
      boardMembers = members;
      const currentBoard = availableBoards.find(item => item.id === boardId);
      const currentMembership = boardMembers.find(item => item.userId === currentUser.id);
      canEditChecklist = Boolean(
        (currentBoard && currentBoard.ownerId === currentUser.id) ||
        (currentMembership && ["OWNER", "EDITOR"].includes(currentMembership.role))
      );
      checklistFormEl.querySelectorAll("input, button").forEach(control => {
        control.disabled = !canEditChecklist;
      });
      checklistPermissionNote.hidden = canEditChecklist;
      taskAssigneeEl.replaceChildren();
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Sem responsável";
      taskAssigneeEl.appendChild(placeholder);
      boardMembers.forEach(member => {
        const option = document.createElement("option");
        option.value = member.userId || member.email;
        option.textContent = member.profile ? member.profile.name : member.email;
        if (member.userId === task.assigneeId) option.selected = true;
        taskAssigneeEl.appendChild(option);
      });
      if (task.assigneeId) {
        taskAssigneeEl.value = task.assigneeId;
      }

      renderChecklist(taskInfo.checklist);
      renderComments(taskInfo.comments);
      renderAcceptance(taskInfo.acceptanceCriteria);
      renderDoD(taskInfo.definitionOfDone);
      renderActivity(taskInfo.activities);
      renderLabels(taskInfo.labels);
      breakSubtasksButton.disabled = false;
    }

    taskStatusEl.addEventListener("change", async () => {
      const previousStatus = taskInfo.task.status;
      const nextStatus = taskStatusEl.value;
      await window.KanbanStorage.updateTask(taskId, { status: taskStatusEl.value });
      if (previousStatus !== nextStatus) {
        const statusNames = { todo: "A Fazer", progress: "Em Andamento", done: "Concluído" };
        await recordTaskActivity("task_moved", `A tarefa “${taskInfo.task.title}” foi movida para ${statusNames[nextStatus] || nextStatus}.`);
      }
      await loadTask();
    });

    taskPriorityEl.addEventListener("change", async () => {
      await updateTaskField({ priority: taskPriorityEl.value }, `Prioridade da tarefa “${taskInfo.task.title}” atualizada.`);
    });

    taskDueDateEl.addEventListener("change", async () => {
      await updateTaskField({ due_date: taskDueDateEl.value || null }, `Prazo da tarefa “${taskInfo.task.title}” atualizado.`);
    });

    taskAssigneeEl.addEventListener("change", async () => {
      const selected = taskAssigneeEl.value || null;
      await updateTaskField({ assignee_id: selected }, `Responsável da tarefa “${taskInfo.task.title}” atualizado.`);
    });

    taskStoryPointsEl.addEventListener("change", async () => {
      const value = taskStoryPointsEl.value === "" ? null : Number(taskStoryPointsEl.value);
      await updateTaskField({ story_points: value }, `Story points da tarefa “${taskInfo.task.title}” atualizados.`);
    });

    checklistFormEl.addEventListener("submit", async event => {
      event.preventDefault();
      if (!canEditChecklist) return;
      const input = document.getElementById("checklist-input");
      try {
        await window.KanbanStorage.addChecklistItem(taskId, input.value);
        await recordTaskActivity("task_updated", `Uma subtarefa foi adicionada à tarefa “${taskInfo.task.title}”.`);
        input.value = "";
        checklistPermissionNote.textContent = "Somente proprietários e editores podem alterar o checklist deste quadro.";
        checklistPermissionNote.hidden = true;
        await loadTask();
      } catch (error) {
        checklistPermissionNote.textContent = error.message || "Não foi possível salvar a subtarefa.";
        checklistPermissionNote.hidden = false;
      }
    });

    document.getElementById("comment-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("comment-input");
      await window.KanbanStorage.addTaskComment(taskId, input.value);
      await recordTaskActivity("comment_added", `Novo comentário na tarefa “${taskInfo.task.title}”.`);
      input.value = "";
      await loadTask();
    });

    document.getElementById("acceptance-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("acceptance-input");
      await window.KanbanStorage.addAcceptanceCriterion(taskId, input.value);
      await recordTaskActivity("task_updated", `Um critério de aceite foi adicionado à tarefa “${taskInfo.task.title}”.`);
      input.value = "";
      await loadTask();
    });

    document.getElementById("dod-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("dod-input");
      await window.KanbanStorage.addDefinitionOfDone(taskId, input.value);
      await recordTaskActivity("task_updated", `Um item de Definition of Done foi adicionado à tarefa “${taskInfo.task.title}”.`);
      input.value = "";
      await loadTask();
    });

    openInBoardButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });

    breakSubtasksButton.addEventListener("click", async () => {
      if (!taskInfo || !taskInfo.task || breakSubtasksButton.disabled) return;
      aiSubtasksModal.hidden = false;
      document.body.style.overflow = "hidden";
      aiSubtasksList.replaceChildren();
      aiSubtasksStatus.textContent = "Analisando os dados desta tarefa...";
      aiSubtasksStatus.dataset.type = "";
      aiSubtasksSave.disabled = true;
      breakSubtasksButton.disabled = true;
      try {
        const result = await window.KanbanAI.generateSubtasks(taskId);
        if (!Array.isArray(result.suggestions) || !result.suggestions.length) {
          throw new Error("A IA não retornou sugestões para esta tarefa.");
        }
        renderSubtaskSuggestions(result.suggestions);
        aiSubtasksStatus.textContent = "Selecione as sugestões que deseja adicionar.";
      } catch (error) {
        aiSubtasksStatus.textContent = error.message || "Não foi possível gerar as subtasks.";
        aiSubtasksStatus.dataset.type = "error";
      } finally {
        breakSubtasksButton.disabled = false;
      }
    });

    document.getElementById("ai-subtasks-close").addEventListener("click", closeSubtasksModal);
    document.getElementById("ai-subtasks-cancel").addEventListener("click", closeSubtasksModal);
    aiSubtasksModal.addEventListener("click", event => {
      if (event.target === aiSubtasksModal) closeSubtasksModal();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !aiSubtasksModal.hidden) closeSubtasksModal();
    });
    aiSubtasksSave.addEventListener("click", async () => {
      const selected = [...aiSubtasksList.querySelectorAll("input[type='checkbox']:checked")]
        .map(checkbox => checkbox.value);
      if (!selected.length) return;
      aiSubtasksSave.disabled = true;
      aiSubtasksSave.textContent = "Salvando...";
      try {
        const result = await window.KanbanAI.saveSubtasks(taskId, selected);
        if (!Array.isArray(result.saved) || result.saved.length !== selected.length) {
          throw new Error("O serviço não confirmou todas as subtasks.");
        }
        try {
          const activity = await recordTaskActivity("task_updated", `${selected.length} subtasks adicionadas à tarefa “${taskInfo.task.title}”.`);
          if (activity) {
            taskInfo.activities.unshift({
              id: activity.id,
              action: activity.action,
              description: activity.description,
              createdAt: activity.created_at
            });
            renderActivity(taskInfo.activities);
          } else {
            console.error("As subtasks foram salvas, mas a atividade não foi registrada.");
          }
        } catch (error) {
          console.error("As subtasks foram salvas, mas a atividade não foi registrada.", error);
        }
        taskInfo.checklist.push(...result.saved.map(item => ({
          id: item.id,
          taskId: item.task_id,
          title: item.title,
          done: Boolean(item.done),
          createdAt: item.created_at
        })));
        renderChecklist(taskInfo.checklist);
        closeSubtasksModal();
      } catch (error) {
        aiSubtasksStatus.textContent = error.message || "Não foi possível salvar as subtasks no checklist.";
        aiSubtasksStatus.dataset.type = "error";
        updateSubtaskSelection();
      }
    });

    logoutButton.addEventListener("click", async () => {
      try {
        await window.KanbanAuth.logout();
      } catch (error) {
        console.error(error);
      }
    });

    await loadTask();
  }

  main().catch(error => {
    console.error("Falha ao carregar tarefa.", error);
    const title = document.getElementById("task-title");
    if (title) title.textContent = "Não foi possível carregar a tarefa.";
  });
})();
