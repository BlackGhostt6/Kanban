(() => {
  "use strict";

  const STATUSES = ["todo", "progress", "done"];
  const STATUS_LABELS = { todo: "A Fazer", progress: "Em Andamento", done: "Concluído" };
  const STATUS_ICONS = {
    todo: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/></svg>',
    progress: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 8v4l2.5 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    done: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="m8.5 12 2.2 2.2 4.8-4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  async function main() {
    const currentUser = await window.KanbanAuth.requireSession();
    if (!currentUser) return;

    const board = document.querySelector(".board");
    const taskSummary = document.getElementById("task-summary");
    const taskForm = document.getElementById("task-form");
    const modal = document.getElementById("task-modal");
    const shareModal = document.getElementById("share-modal");
    const titleInput = document.getElementById("task-title");
    const descriptionInput = document.getElementById("task-description");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const submitLabel = document.getElementById("task-submit-label");
    const toastRegion = document.getElementById("toast-region");
    const boardSelector = document.getElementById("board-selector");
    const shareForm = document.getElementById("share-form");
    const shareEmailInput = document.getElementById("share-email");
    const shareRoleInput = document.getElementById("share-role");

    document.getElementById("welcome-name").textContent = currentUser.name;
    document.getElementById("user-avatar").textContent = currentUser.name
      .split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join("").toLocaleUpperCase("pt-BR");

    let boards = [];
    let boardMembers = [];
    let tasks = [];
    let columns = [];
    let activeBoard = null;
    let draggedTaskId = null;
    let editingTaskId = null;
    let lastFocusedElement = null;

    function setSyncStatus(status) {
      const indicator = document.getElementById("save-indicator-label");
      if (indicator) indicator.textContent = status;
    }

    function escapeHTML(value) {
      return String(value || "").replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      })[character]);
    }

    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date).replace(" de ", " ");
    }

    function getActiveBoardFields() {
      const candidates = columns.length ? columns : STATUSES.map(status => ({ key: status, name: STATUS_LABELS[status], wipLimit: null }));
      return candidates;
    }

    function renderBoardList() {
      if (!boardSelector) return;
      const activeId = activeBoard ? activeBoard.id : "";
      boardSelector.replaceChildren();
      boards.forEach(boardItem => {
        const option = document.createElement("option");
        option.value = boardItem.id;
        option.textContent = boardItem.name;
        if (boardItem.id === activeId) option.selected = true;
        boardSelector.append(option);
      });
    }

    function renderBoard() {
      let total = 0;
      const statuses = getActiveBoardFields().map(column => column.key);

      statuses.forEach(status => {
        const container = document.querySelector(`[data-cards="${status}"]`);
        if (!container) return;
        const columnTasks = tasks.filter(task => task.status === status);
        total += columnTasks.length;
        container.replaceChildren();

        if (columnTasks.length === 0) {
          const empty = document.createElement("div");
          empty.className = "empty-state";
          empty.innerHTML = '<div><svg class="empty-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="4.5" width="14" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 9h7M8.5 12.5h7M8.5 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><p>Nenhuma tarefa por aqui.<br>Que tal adicionar uma?</p></div>';
          container.append(empty);
        } else {
          columnTasks.forEach(task => container.append(createTaskCard(task)));
        }

        const count = document.querySelector(`[data-count="${status}"]`);
        if (count) {
          count.textContent = String(columnTasks.length);
          count.setAttribute("aria-label", `${columnTasks.length} ${columnTasks.length === 1 ? "tarefa" : "tarefas"}`);
        }
      });

      const summary = taskSummary;
      if (summary) summary.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} no quadro`;
    }

    function createTaskCard(task) {
      const card = document.createElement("article");
      card.className = "task-card";
      card.draggable = true;
      card.dataset.taskId = task.id;
      card.setAttribute("aria-label", `${task.title}, status ${STATUS_LABELS[task.status] || task.status}. Arraste para mover entre colunas.`);

      const cardTop = document.createElement("div");
      cardTop.className = "task-card-top";

      const titleWrap = document.createElement("div");
      titleWrap.className = "task-title-wrap";
      const title = document.createElement("h3");
      title.className = "task-title";
      title.textContent = task.title;
      titleWrap.appendChild(title);

      const link = document.createElement("a");
      link.className = "task-link";
      link.href = `task.html?id=${task.id}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir";

      const actions = document.createElement("div");
      actions.className = "task-actions";
      const editButton = document.createElement("button");
      editButton.className = "edit-button";
      editButton.type = "button";
      editButton.setAttribute("aria-label", `Editar tarefa: ${task.title}`);
      editButton.title = "Editar tarefa";
      editButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5 5 5M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.type = "button";
      deleteButton.setAttribute("aria-label", `Excluir tarefa: ${task.title}`);
      deleteButton.title = "Excluir tarefa";
      deleteButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l.8 13h9.4l.8-13M9 7V4.5h6V7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      actions.append(editButton, deleteButton);
      cardTop.append(titleWrap, actions);

      const meta = document.createElement("div");
      meta.className = "task-meta";
      if (task.priority) {
        const priorityBadge = document.createElement("span");
        priorityBadge.className = `priority-badge priority-${task.priority}`;
        priorityBadge.textContent = task.priority === "alta" ? "Alta" : task.priority === "baixa" ? "Baixa" : "Média";
        meta.append(priorityBadge);
      }
      if (task.dueDate) {
        const due = document.createElement("span");
        due.className = "task-due";
        due.textContent = `Prazo: ${formatDate(task.dueDate)}`;
        meta.append(due);
      }

      const description = document.createElement("p");
      description.className = "task-description";
      description.textContent = task.description || "";

      const footer = document.createElement("div");
      footer.className = "task-footer";
      const statusTag = document.createElement("span");
      statusTag.className = "status-tag";
      statusTag.innerHTML = `${STATUS_ICONS[task.status] || ""}${STATUS_LABELS[task.status] || task.status}`;
      const date = document.createElement("time");
      date.className = "task-date";
      date.dateTime = task.createdAt;
      date.textContent = formatDate(task.createdAt);
      footer.append(statusTag, date);

      card.append(cardTop, meta, description, footer, link);

      card.addEventListener("dragstart", event => {
        draggedTaskId = task.id;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", task.id);
        requestAnimationFrame(() => card.classList.add("is-dragging"));
      });
      card.addEventListener("dragend", () => {
        draggedTaskId = null;
        card.classList.remove("is-dragging");
        document.querySelectorAll(".column.drag-over").forEach(column => column.classList.remove("drag-over"));
      });
      editButton.addEventListener("click", () => openModal(task.id));
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      return card;
    }

    function openModal(taskId = null) {
      const task = taskId ? tasks.find(item => item.id === taskId) : null;
      if (taskId && !task) return;
      lastFocusedElement = document.activeElement;
      editingTaskId = task ? task.id : null;
      taskForm.reset();
      modalTitle.textContent = task ? "Editar tarefa" : "Nova tarefa";
      modalDescription.textContent = task ? "Atualize o título ou a descrição desta tarefa." : "Registre o próximo passo do seu trabalho.";
      submitLabel.textContent = task ? "Salvar alterações" : "Salvar Tarefa";
      if (task) {
        titleInput.value = task.title;
        descriptionInput.value = task.description;
      }
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => titleInput.focus());
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
      taskForm.reset();
      editingTaskId = null;
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
    }

    function showToast(message, isError = false) {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", isError ? "alert" : "status");
      const icon = isError
        ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v5m0 3h.01M10.3 4.9 2.8 18a1.5 1.5 0 0 0 1.3 2.2h15.8a1.5 1.5 0 0 0 1.3-2.2l-7.5-13.1a1.5 1.5 0 0 0-2.6 0Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      toast.innerHTML = `${icon}<span>${escapeHTML(message)}</span>`;
      toastRegion.append(toast);
      window.setTimeout(() => {
        toast.classList.add("is-leaving");
        toast.addEventListener("animationend", () => toast.remove(), { once: true });
      }, 2800);
    }

    async function loadBoardState() {
      const defaultBoard = await window.KanbanStorage.ensureDefaultBoard();
      if (!defaultBoard) return;
      boards = await window.KanbanStorage.getBoards();
      const savedBoardId = window.localStorage.getItem("dayboard-active-board");
      activeBoard = boards.find(boardItem => boardItem.id === savedBoardId) || boards.find(boardItem => boardItem.id === defaultBoard.id) || boards[0] || defaultBoard;
      if (!activeBoard) return;
      window.localStorage.setItem("dayboard-active-board", activeBoard.id);
      boardMembers = await window.KanbanStorage.getBoardMembers(activeBoard.id);
      columns = await window.KanbanStorage.getBoardColumns(activeBoard.id);
      tasks = await window.KanbanStorage.getTasks(activeBoard.id);
      renderBoardList();
      renderBoard();
    }

    async function addTask(title, description) {
      setSyncStatus("Salvando...");
      try {
        const task = await window.KanbanStorage.createTask({
          boardId: activeBoard.id,
          userId: currentUser.id,
          title,
          description,
          status: "todo",
          priority: "media"
        });
        await window.KanbanStorage.logActivity(activeBoard.id, task.id, "task_created", `A tarefa “${task.title}” foi criada.`);
        tasks.unshift(task);
        renderBoard();
        setSyncStatus("Sincronizado na nuvem");
        showToast("Tarefa adicionada em A Fazer.");
        return true;
      } catch (error) {
        setSyncStatus("Falha na sincronização");
        showToast(`Não foi possível adicionar a tarefa: ${error.message}`, true);
        return false;
      }
    }

    async function updateTask(taskId, title, description) {
      const task = tasks.find(item => item.id === taskId);
      if (!task) return false;
      setSyncStatus("Salvando...");
      try {
        const updatedTask = await window.KanbanStorage.updateTask(taskId, { title, description });
        tasks = tasks.map(item => item.id === taskId ? updatedTask : item);
        renderBoard();
        setSyncStatus("Sincronizado na nuvem");
        showToast("Tarefa atualizada.");
        return true;
      } catch (error) {
        setSyncStatus("Falha na sincronização");
        showToast(`Não foi possível atualizar a tarefa: ${error.message}`, true);
        return false;
      }
    }

    async function deleteTask(taskId) {
      const task = tasks.find(item => item.id === taskId);
      if (!task || !window.confirm(`Excluir a tarefa “${task.title}”?`)) return;
      setSyncStatus("Salvando...");
      try {
        await window.KanbanStorage.deleteTask(taskId);
        tasks = tasks.filter(item => item.id !== taskId);
        renderBoard();
        setSyncStatus("Sincronizado na nuvem");
        showToast("Tarefa excluída.");
      } catch (error) {
        setSyncStatus("Falha na sincronização");
        showToast(`Não foi possível excluir a tarefa: ${error.message}`, true);
      }
    }

    async function moveTask(taskId, nextStatus) {
      if (!STATUSES.includes(nextStatus)) return;
      const task = tasks.find(item => item.id === taskId);
      if (!task || task.status === nextStatus) return;
      setSyncStatus("Salvando...");
      try {
        const updatedTask = await window.KanbanStorage.updateTask(taskId, { status: nextStatus });
        await window.KanbanStorage.logActivity(activeBoard.id, taskId, "task_moved", `A tarefa foi movida para ${STATUS_LABELS[nextStatus]}.`);
        tasks = tasks.map(item => item.id === taskId ? updatedTask : item);
        renderBoard();
        setSyncStatus("Sincronizado na nuvem");
        showToast(`Tarefa movida para ${STATUS_LABELS[nextStatus]}.`);
      } catch (error) {
        setSyncStatus("Falha na sincronização");
        showToast(`Não foi possível mover a tarefa: ${error.message}`, true);
      }
    }

    async function createBoard(name) {
      const created = await window.KanbanStorage.createBoard(name || "Meu quadro");
      boards = await window.KanbanStorage.getBoards();
      activeBoard = created;
      window.localStorage.setItem("dayboard-active-board", activeBoard.id);
      columns = await window.KanbanStorage.getBoardColumns(activeBoard.id);
      tasks = await window.KanbanStorage.getTasks(activeBoard.id);
      renderBoardList();
      renderBoard();
      showToast(`Quadro “${created.name}” criado.`);
      return created;
    }

    async function openInviteModal() {
      if (!activeBoard) return;
      shareEmailInput.value = "";
      shareRoleInput.value = "EDITOR";
      shareModal.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => shareEmailInput.focus());
    }

    function closeShareModal() {
      shareModal.hidden = true;
      document.body.style.overflow = "";
      shareForm.reset();
    }

    document.getElementById("logout-button").addEventListener("click", async () => {
      try {
        await window.KanbanAuth.logout();
      } catch (error) {
        showToast(`Não foi possível encerrar a sessão: ${error.message}`, true);
      }
    });
    document.getElementById("add-task-button").addEventListener("click", () => openModal());
    document.querySelectorAll("[data-open-modal]").forEach(button => button.addEventListener("click", () => openModal()));
    document.getElementById("close-modal-button").addEventListener("click", closeModal);
    document.getElementById("cancel-modal-button").addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    document.getElementById("close-share-modal-button").addEventListener("click", closeShareModal);
    document.getElementById("cancel-share-button").addEventListener("click", closeShareModal);
    shareModal.addEventListener("click", event => { if (event.target === shareModal) closeShareModal(); });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !modal.hidden) closeModal();
      if (event.key === "Escape" && !shareModal.hidden) closeShareModal();
    });

    boardSelector.addEventListener("change", async event => {
      const boardId = event.target.value;
      const selectedBoard = boards.find(item => item.id === boardId);
      if (!selectedBoard) return;
      activeBoard = selectedBoard;
      window.localStorage.setItem("dayboard-active-board", activeBoard.id);
      boardMembers = await window.KanbanStorage.getBoardMembers(activeBoard.id);
      columns = await window.KanbanStorage.getBoardColumns(activeBoard.id);
      tasks = await window.KanbanStorage.getTasks(activeBoard.id);
      renderBoard();
    });

    document.getElementById("new-board-button").addEventListener("click", async () => {
      const name = window.prompt("Qual será o nome do novo quadro?");
      if (!name || !name.trim()) return;
      await createBoard(name.trim());
    });

    document.getElementById("invite-member-button").addEventListener("click", openInviteModal);

    shareForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!activeBoard) return;
      if (!shareEmailInput.value.trim()) {
        shareEmailInput.setCustomValidity("Informe o e-mail.");
        shareEmailInput.reportValidity();
        return;
      }
      try {
        await window.KanbanStorage.inviteMember(activeBoard.id, shareEmailInput.value, shareRoleInput.value);
        closeShareModal();
        showToast("Convite salvo para o quadro.");
      } catch (error) {
        showToast(error.message || "Não foi possível compartilhar o quadro.", true);
      }
    });

    taskForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!taskForm.reportValidity()) return;
      const title = titleInput.value.trim();
      if (!title) {
        titleInput.setCustomValidity("Informe um título para a tarefa.");
        titleInput.reportValidity();
        return;
      }
      titleInput.setCustomValidity("");
      const description = descriptionInput.value.trim();
      const submitButton = taskForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      const saved = editingTaskId
        ? await updateTask(editingTaskId, title, description)
        : await addTask(title, description);
      submitButton.disabled = false;
      if (saved) closeModal();
    });
    titleInput.addEventListener("input", () => titleInput.setCustomValidity(""));

    board.querySelectorAll(".column").forEach(column => {
      column.addEventListener("dragenter", event => {
        event.preventDefault();
        column.classList.add("drag-over");
      });
      column.addEventListener("dragover", event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      });
      column.addEventListener("dragleave", event => {
        if (!column.contains(event.relatedTarget)) column.classList.remove("drag-over");
      });
      column.addEventListener("drop", event => {
        event.preventDefault();
        column.classList.remove("drag-over");
        const taskId = event.dataTransfer.getData("text/plain") || draggedTaskId;
        if (taskId) moveTask(taskId, column.dataset.status);
      });
    });

    taskSummary.textContent = "Carregando suas tarefas...";
    await loadBoardState();
    setSyncStatus("Sincronizado na nuvem");
  }

  main().catch(error => {
    console.error("Não foi possível carregar o quadro.", error);
    const summary = document.getElementById("task-summary");
    if (summary) summary.textContent = "Não foi possível carregar as tarefas. Verifique a conexão e atualize a página.";
    const syncStatus = document.getElementById("save-indicator-label");
    if (syncStatus) syncStatus.textContent = "Falha na sincronização";
  });
})();
