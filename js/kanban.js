    (() => {
      "use strict";

      const STATUSES = ["todo", "progress", "done"];
      const STATUS_LABELS = { todo: "A Fazer", progress: "Em Andamento", done: "Concluído" };
      const STATUS_ICONS = {
        todo: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/></svg>',
        progress: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 8v4l2.5 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        done: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="m8.5 12 2.2 2.2 4.8-4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      };

      const currentUser = window.KanbanAuth.requireSession();
      if (!currentUser) return;

      const board = document.querySelector(".board");
      const taskForm = document.getElementById("task-form");
      const modal = document.getElementById("task-modal");
      const titleInput = document.getElementById("task-title");
      const descriptionInput = document.getElementById("task-description");
      const modalTitle = document.getElementById("modal-title");
      const modalDescription = document.getElementById("modal-description");
      const submitLabel = document.getElementById("task-submit-label");
      const toastRegion = document.getElementById("toast-region");
      let tasks = window.KanbanStorage.getTasks(currentUser.id);
      let draggedTaskId = null;
      let editingTaskId = null;
      let lastFocusedElement = null;

      function persistTasks() {
        if (!window.KanbanStorage.saveTasks(currentUser.id, tasks)) {
          showToast("Não foi possível salvar. Verifique o espaço disponível no navegador.", true);
          return false;
        }
        return true;
      }

      function escapeHTML(value) {
        return value.replace(/[&<>"']/g, character => ({
          "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
      }

      function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date).replace(" de ", " ");
      }

      function renderBoard() {
        let total = 0;
        for (const status of STATUSES) {
          const container = document.querySelector(`[data-cards="${status}"]`);
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
          count.textContent = String(columnTasks.length);
          count.setAttribute("aria-label", `${columnTasks.length} ${columnTasks.length === 1 ? "tarefa" : "tarefas"}`);
        }

        document.getElementById("task-summary").textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} no quadro`;
      }

      function createTaskCard(task) {
        const card = document.createElement("article");
        card.className = "task-card";
        card.draggable = true;
        card.dataset.taskId = task.id;
        card.setAttribute("aria-label", `${task.title}, status ${STATUS_LABELS[task.status]}. Arraste para mover entre colunas.`);
        const cardTop = document.createElement("div");
        cardTop.className = "task-card-top";
        const title = document.createElement("h3");
        title.className = "task-title";
        title.textContent = task.title;
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
        cardTop.append(title, actions);

        const description = document.createElement("p");
        description.className = "task-description";
        description.textContent = task.description;

        const footer = document.createElement("div");
        footer.className = "task-footer";
        const statusTag = document.createElement("span");
        statusTag.className = "status-tag";
        statusTag.innerHTML = `${STATUS_ICONS[task.status]}${STATUS_LABELS[task.status]}`;
        const date = document.createElement("time");
        date.className = "task-date";
        date.dateTime = task.createdAt;
        date.textContent = formatDate(task.createdAt);
        footer.append(statusTag, date);
        card.append(cardTop, description, footer);

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

      function addTask(title, description) {
        tasks.unshift({
          id: window.crypto && typeof window.crypto.randomUUID === "function"
            ? window.crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          title,
          description,
          status: "todo",
          createdAt: new Date().toISOString()
        });
        persistTasks();
        renderBoard();
        showToast("Tarefa adicionada em A Fazer.");
      }

      function updateTask(taskId, title, description) {
        const task = tasks.find(item => item.id === taskId);
        if (!task) return;
        task.title = title;
        task.description = description;
        persistTasks();
        renderBoard();
        showToast("Tarefa atualizada.");
      }

      function deleteTask(taskId) {
        const task = tasks.find(item => item.id === taskId);
        if (!task || !window.confirm(`Excluir a tarefa “${task.title}”?`)) return;
        tasks = tasks.filter(item => item.id !== taskId);
        persistTasks();
        renderBoard();
        showToast("Tarefa excluída.");
      }

      function moveTask(taskId, nextStatus) {
        if (!STATUSES.includes(nextStatus)) return;
        const task = tasks.find(item => item.id === taskId);
        if (!task || task.status === nextStatus) return;
        task.status = nextStatus;
        persistTasks();
        renderBoard();
        showToast(`Tarefa movida para ${STATUS_LABELS[nextStatus]}.`);
      }

      document.getElementById("welcome-name").textContent = currentUser.name;
      document.getElementById("user-avatar").textContent = currentUser.name
        .split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join("").toLocaleUpperCase("pt-BR");
      document.getElementById("logout-button").addEventListener("click", window.KanbanAuth.logout);
      document.getElementById("add-task-button").addEventListener("click", () => openModal());
      document.querySelectorAll("[data-open-modal]").forEach(button => button.addEventListener("click", () => openModal()));
      document.getElementById("close-modal-button").addEventListener("click", closeModal);
      document.getElementById("cancel-modal-button").addEventListener("click", closeModal);
      modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !modal.hidden) closeModal();
      });

      taskForm.addEventListener("submit", event => {
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
        if (editingTaskId) updateTask(editingTaskId, title, description);
        else addTask(title, description);
        closeModal();
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

      renderBoard();
    })();
