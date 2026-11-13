(() => {
  "use strict";

  function initialize() {
    const center = document.querySelector(".notification-center");
    const toggle = document.getElementById("notifications-toggle");
    const panel = document.getElementById("notifications-panel");
    const closeButton = document.getElementById("notifications-close");
    const count = document.getElementById("notifications-count");
    const status = document.getElementById("notifications-status");
    const invitationsContainer = document.getElementById("notifications-invitations");
    const activityContainer = document.getElementById("notifications-activity");
    if (!center || !toggle || !panel || !closeButton || !count || !status || !invitationsContainer || !activityContainer) return;

    let currentUser = null;
    let invitations = [];
    let activities = [];
    let boardsById = new Map();
    let lastReadAt = Date.now();
    let isOpen = false;
    let isRefreshing = false;
    let refreshAgain = false;
    let markReadAfterRefresh = false;
    let readStorageKey = "";

    function setStatus(message) {
      status.textContent = message || "";
    }

    function formatTimestamp(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    }

    function updateCount() {
      const unreadActivities = activities.filter(item =>
        item.userId !== currentUser.id && new Date(item.createdAt).getTime() > lastReadAt
      ).length;
      const total = invitations.length + unreadActivities;
      count.textContent = total > 99 ? "99+" : String(total);
      count.hidden = total === 0;
      toggle.setAttribute("aria-label", total ? `Notificações, ${total} não lidas` : "Notificações");
    }

    function renderInvitations() {
      invitationsContainer.replaceChildren();
      if (!invitations.length) {
        const empty = document.createElement("p");
        empty.className = "notification-empty";
        empty.textContent = "Você não tem convites pendentes.";
        invitationsContainer.appendChild(empty);
        return;
      }

      invitations.forEach(invitation => {
        const item = document.createElement("article");
        item.className = "notification-item";
        const boardName = document.createElement("strong");
        boardName.className = "notification-board";
        boardName.textContent = invitation.boardName;
        const message = document.createElement("p");
        const roleNames = { OWNER: "dono", EDITOR: "editor", VIEWER: "leitor" };
        message.textContent = `${invitation.inviterName} convidou você como ${roleNames[invitation.role] || invitation.role}.`;
        const time = document.createElement("time");
        time.dateTime = invitation.invitedAt;
        time.textContent = formatTimestamp(invitation.invitedAt);
        const actions = document.createElement("div");
        actions.className = "notification-actions";

        const acceptButton = document.createElement("button");
        acceptButton.type = "button";
        acceptButton.className = "primary-button";
        acceptButton.textContent = "Aceitar";
        acceptButton.addEventListener("click", () => respondToInvitation(invitation, true, actions));

        const declineButton = document.createElement("button");
        declineButton.type = "button";
        declineButton.className = "secondary-button";
        declineButton.textContent = "Recusar";
        declineButton.addEventListener("click", () => respondToInvitation(invitation, false, actions));

        actions.append(acceptButton, declineButton);
        item.append(boardName, message, time, actions);
        invitationsContainer.appendChild(item);
      });
    }

    function renderActivities() {
      activityContainer.replaceChildren();
      const visibleActivities = activities.filter(item => item.userId !== currentUser.id);
      if (!visibleActivities.length) {
        const empty = document.createElement("p");
        empty.className = "notification-empty";
        empty.textContent = "Nenhuma atualização recente nos seus quadros.";
        activityContainer.appendChild(empty);
        return;
      }

      visibleActivities.forEach(activity => {
        const item = document.createElement("article");
        item.className = "notification-item";
        if (new Date(activity.createdAt).getTime() > lastReadAt) item.classList.add("notification-unread");
        const link = document.createElement("a");
        link.className = "notification-activity-link";
        link.href = activity.taskId ? `task.html?id=${encodeURIComponent(activity.taskId)}` : "index.html";
        link.addEventListener("click", () => {
          try {
            window.localStorage.setItem("dayboard-active-board", activity.boardId);
          } catch (error) {
            setStatus(`Não foi possível salvar o quadro selecionado: ${error.message}`);
          }
        });
        const boardName = document.createElement("strong");
        boardName.className = "notification-board";
        const board = boardsById.get(activity.boardId);
        boardName.textContent = board ? board.name : "Quadro";
        const message = document.createElement("p");
        message.textContent = activity.description;
        const time = document.createElement("time");
        time.dateTime = activity.createdAt;
        time.textContent = formatTimestamp(activity.createdAt);
        link.append(boardName, message, time);
        item.appendChild(link);
        activityContainer.appendChild(item);
      });
    }

    function render() {
      renderInvitations();
      renderActivities();
      updateCount();
    }

    async function refresh(markRead) {
      if (isRefreshing) {
        refreshAgain = true;
        markReadAfterRefresh = markReadAfterRefresh || Boolean(markRead);
        return false;
      }
      isRefreshing = true;
      try {
        currentUser = currentUser || await window.KanbanAuth.getCurrentUser();
        if (!currentUser) {
          toggle.disabled = true;
          return false;
        }
        readStorageKey = `dayboard-notifications-read:${currentUser.id}`;
        if (lastReadAt === null) {
          const storedReadAt = window.localStorage.getItem(readStorageKey);
          lastReadAt = storedReadAt ? new Date(storedReadAt).getTime() : Date.now();
        }

        const [boards, pendingInvitations] = await Promise.all([
          window.KanbanStorage.getBoards(),
          window.KanbanStorage.getPendingBoardInvitations()
        ]);
        const activityGroups = await Promise.all(
          boards.map(board => window.KanbanStorage.getBoardActivity(board.id))
        );
        boardsById = new Map(boards.map(board => [board.id, board]));
        invitations = pendingInvitations;
        activities = activityGroups.flat().sort((left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
        );
        if (markRead || markReadAfterRefresh) {
          lastReadAt = Date.now();
          window.localStorage.setItem(readStorageKey, new Date(lastReadAt).toISOString());
        }
        markReadAfterRefresh = false;
        setStatus("");
        render();
        return true;
      } catch (error) {
        console.error("Não foi possível atualizar as notificações.", error);
        setStatus(`Não foi possível carregar as notificações: ${error.message}`);
        return false;
      } finally {
        isRefreshing = false;
        if (refreshAgain) {
          refreshAgain = false;
          refresh(isOpen);
        }
      }
    }

    async function respondToInvitation(invitation, accept, actions) {
      actions.querySelectorAll("button").forEach(button => { button.disabled = true; });
      setStatus(accept ? "Aceitando convite..." : "Recusando convite...");
      try {
        let responseMessage;
        if (accept) {
          const boardId = await window.KanbanStorage.acceptBoardInvitation(invitation.id);
          window.dispatchEvent(new CustomEvent("dayboard:invitation-accepted", { detail: { boardId } }));
          responseMessage = "Convite aceito. O quadro já está disponível.";
        } else {
          await window.KanbanStorage.declineBoardInvitation(invitation.id);
          responseMessage = "Convite recusado.";
        }
        const refreshed = await refresh(isOpen);
        if (refreshed) setStatus(responseMessage);
      } catch (error) {
        console.error("Não foi possível responder ao convite.", error);
        setStatus(`Não foi possível responder ao convite: ${error.message}`);
        actions.querySelectorAll("button").forEach(button => { button.disabled = false; });
      }
    }

    function closePanel() {
      isOpen = false;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", async () => {
      isOpen = !isOpen;
      panel.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        await refresh(true);
        closeButton.focus();
      }
    });
    closeButton.addEventListener("click", () => {
      closePanel();
      toggle.focus();
    });
    document.addEventListener("click", event => {
      if (isOpen && !center.contains(event.target)) closePanel();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && isOpen) {
        closePanel();
        toggle.focus();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refresh(isOpen);
    });

    lastReadAt = null;
    refresh(false);
    window.setInterval(() => refresh(isOpen), 30000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
