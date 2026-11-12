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
    const openInBoardButton = document.getElementById("open-in-board");
    const logoutButton = document.getElementById("logout-button");
    let taskInfo = null;
    let boardMembers = [];

    function formatDate(value) {
      if (!value) return "Não definido";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
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
        checkbox.addEventListener("change", async () => {
          await window.KanbanStorage.toggleChecklistItem(item.id, checkbox.checked);
          await loadTask();
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
          await loadTask();
        });
        taskLabelsEl.appendChild(button);
      });
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
      boardMembers = await window.KanbanStorage.getBoardMembers(boardId);
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
    }

    taskStatusEl.addEventListener("change", async () => {
      await window.KanbanStorage.updateTask(taskId, { status: taskStatusEl.value });
      await loadTask();
    });

    taskPriorityEl.addEventListener("change", async () => {
      await window.KanbanStorage.updateTask(taskId, { priority: taskPriorityEl.value });
      await loadTask();
    });

    taskDueDateEl.addEventListener("change", async () => {
      await window.KanbanStorage.updateTask(taskId, { due_date: taskDueDateEl.value || null });
      await loadTask();
    });

    taskAssigneeEl.addEventListener("change", async () => {
      const selected = taskAssigneeEl.value || null;
      await window.KanbanStorage.updateTask(taskId, { assignee_id: selected });
      await loadTask();
    });

    taskStoryPointsEl.addEventListener("change", async () => {
      const value = taskStoryPointsEl.value === "" ? null : Number(taskStoryPointsEl.value);
      await window.KanbanStorage.updateTask(taskId, { story_points: value });
      await loadTask();
    });

    document.getElementById("checklist-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("checklist-input");
      await window.KanbanStorage.addChecklistItem(taskId, input.value);
      input.value = "";
      await loadTask();
    });

    document.getElementById("comment-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("comment-input");
      await window.KanbanStorage.addTaskComment(taskId, input.value);
      input.value = "";
      await loadTask();
    });

    document.getElementById("acceptance-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("acceptance-input");
      await window.KanbanStorage.addAcceptanceCriterion(taskId, input.value);
      input.value = "";
      await loadTask();
    });

    document.getElementById("dod-form").addEventListener("submit", async event => {
      event.preventDefault();
      const input = document.getElementById("dod-input");
      await window.KanbanStorage.addDefinitionOfDone(taskId, input.value);
      input.value = "";
      await loadTask();
    });

    openInBoardButton.addEventListener("click", () => {
      window.location.href = "index.html";
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
