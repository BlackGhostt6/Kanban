(() => {
  "use strict";

  const toggle = document.getElementById("ai-chat-toggle");
  const backdrop = document.getElementById("ai-chat-backdrop");
  const closeButton = document.getElementById("ai-chat-close");
  const boardSelector = document.getElementById("board-selector");
  const form = document.getElementById("ai-chat-form");
  const input = document.getElementById("ai-chat-input");
  const sendButton = document.getElementById("ai-chat-send");
  const messagesElement = document.getElementById("ai-chat-messages");
  const welcome = document.getElementById("ai-chat-welcome");
  const status = document.getElementById("ai-chat-status");
  const suggestions = document.getElementById("ai-chat-suggestions");
  const conversation = [];
  let conversationBoardId = "";
  let previousFocus = null;
  let busy = false;

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.dataset.type = isError ? "error" : "";
  }

  function scrollToLatest() {
    requestAnimationFrame(() => { messagesElement.scrollTop = messagesElement.scrollHeight; });
  }

  function appendMessage(text, role, isLoading = false) {
    const bubble = document.createElement("div");
    bubble.className = `ai-chat-message ai-chat-message-${role}${isLoading ? " is-loading" : ""}`;
    bubble.textContent = text;
    messagesElement.appendChild(bubble);
    scrollToLatest();
    return bubble;
  }

  function resetConversation(boardId) {
    conversationBoardId = boardId;
    conversation.length = 0;
    messagesElement.replaceChildren(welcome);
    welcome.hidden = false;
    setStatus("");
  }

  function setBusy(value) {
    busy = value;
    input.disabled = value;
    sendButton.disabled = value;
    suggestions.querySelectorAll("button").forEach(button => { button.disabled = value; });
    form.setAttribute("aria-busy", String(value));
  }

  function openChat() {
    previousFocus = document.activeElement;
    backdrop.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => input.focus());
  }

  function closeChat() {
    backdrop.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  async function sendQuestion(value) {
    if (busy) return;
    const question = String(value || "").trim();
    const boardId = boardSelector.value;
    if (!boardId) {
      setStatus("Selecione um quadro para iniciar a conversa.", true);
      return;
    }
    if (!question || question.length > 2000) {
      setStatus("Digite uma pergunta de até 2000 caracteres.", true);
      input.focus();
      return;
    }

    if (boardId !== conversationBoardId) resetConversation(boardId);
    welcome.hidden = true;
    setStatus("");
    appendMessage(question, "user");
    input.value = "";
    setBusy(true);
    const loading = appendMessage("Analisando as tarefas do quadro...", "assistant", true);
    try {
      const result = await window.KanbanAI.askProject(boardId, question, conversation);
      if (boardSelector.value !== boardId || conversationBoardId !== boardId) {
        loading.remove();
        return;
      }
      if (typeof result.answer !== "string" || !result.answer.trim()) {
        throw new Error("O assistente retornou uma resposta vazia.");
      }
      loading.remove();
      appendMessage(result.answer, "assistant");
      conversation.push({ role: "user", text: question }, { role: "model", text: result.answer });
      if (conversation.length > 10) conversation.splice(0, conversation.length - 10);
      setStatus("");
    } catch (error) {
      loading.remove();
      setStatus(error.message || "Não foi possível consultar o assistente.", true);
    } finally {
      setBusy(false);
      if (!input.value) input.focus();
    }
  }

  toggle.addEventListener("click", openChat);
  closeButton.addEventListener("click", closeChat);
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeChat();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !backdrop.hidden) closeChat();
  });
  boardSelector.addEventListener("change", () => {
    if (boardSelector.value !== conversationBoardId) resetConversation(boardSelector.value);
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    sendQuestion(input.value);
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendQuestion(input.value);
    }
  });
  suggestions.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (button) sendQuestion(button.textContent);
  });
})();
