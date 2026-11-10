(() => {
  "use strict";

  const USERS_KEY = "dayboard.users.v1";
  const SESSION_KEY = "dayboard.session.v1";
  const TASKS_PREFIX = "dayboard.tasks.v1.";
  const VALID_STATUSES = ["todo", "progress", "done"];

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn(`Não foi possível ler ${key} do armazenamento local.`, error);
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Não foi possível salvar ${key} no armazenamento local.`, error);
      return false;
    }
  }

  function isValidPasswordRecord(password) {
    return password && password.algorithm === "PBKDF2" &&
      password.hashAlgorithm === "SHA-256" && Number.isInteger(password.iterations) &&
      password.iterations >= 100000 && password.iterations <= 1000000 &&
      password.keyLength === 256 && /^[a-f0-9]{32}$/i.test(password.salt) &&
      /^[a-f0-9]{64}$/i.test(password.hash);
  }

  function isValidUser(user) {
    return user && typeof user.id === "string" && /^[a-f0-9]{32}$/i.test(user.id) &&
      typeof user.name === "string" && typeof user.email === "string" &&
      typeof user.username === "string" && isValidPasswordRecord(user.password);
  }

  function getUsers() {
    const users = readJSON(USERS_KEY, []);
    return Array.isArray(users) ? users.filter(isValidUser) : [];
  }

  function saveUsers(users) {
    if (!Array.isArray(users) || !users.every(isValidUser)) return false;
    return writeJSON(USERS_KEY, users);
  }

  function findUserById(userId) {
    if (typeof userId !== "string") return null;
    return getUsers().find(user => user.id === userId) || null;
  }

  function findUserByIdentifier(identifier) {
    if (typeof identifier !== "string") return null;
    const normalized = identifier.trim().toLocaleLowerCase("pt-BR");
    return getUsers().find(user => user.email.toLocaleLowerCase("pt-BR") === normalized ||
      user.username.toLocaleLowerCase("pt-BR") === normalized) || null;
  }

  function isValidTask(task) {
    return task && typeof task.id === "string" && typeof task.title === "string" &&
      task.title.trim().length > 0 && task.title.length <= 120 &&
      typeof task.description === "string" && task.description.length <= 600 &&
      VALID_STATUSES.includes(task.status) && typeof task.createdAt === "string" &&
      !Number.isNaN(Date.parse(task.createdAt));
  }

  function tasksKey(userId) {
    if (typeof userId !== "string" || !/^[a-f0-9]{32}$/i.test(userId)) {
      throw new TypeError("Identificador de usuário inválido.");
    }
    return `${TASKS_PREFIX}${encodeURIComponent(userId)}`;
  }

  function getTasks(userId) {
    const tasks = readJSON(tasksKey(userId), []);
    return Array.isArray(tasks) ? tasks.filter(isValidTask) : [];
  }

  function saveTasks(userId, tasks) {
    if (!Array.isArray(tasks) || !tasks.every(isValidTask)) return false;
    return writeJSON(tasksKey(userId), tasks);
  }

  function getSession() {
    const session = readJSON(SESSION_KEY, null);
    if (!session || typeof session.id !== "string" || !/^[a-f0-9]{64}$/i.test(session.id) ||
      typeof session.userId !== "string" || !/^[a-f0-9]{32}$/i.test(session.userId) ||
      typeof session.createdAt !== "string" || Number.isNaN(Date.parse(session.createdAt))) {
      return null;
    }
    return session;
  }

  function saveSession(session) {
    if (!session || typeof session.id !== "string" || !/^[a-f0-9]{64}$/i.test(session.id) ||
      typeof session.userId !== "string" || !/^[a-f0-9]{32}$/i.test(session.userId) ||
      typeof session.createdAt !== "string" || Number.isNaN(Date.parse(session.createdAt))) {
      return false;
    }
    return writeJSON(SESSION_KEY, session);
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
      return true;
    } catch (error) {
      console.error("Não foi possível encerrar a sessão local.", error);
      return false;
    }
  }

  window.KanbanStorage = Object.freeze({
    getUsers,
    saveUsers,
    findUserById,
    findUserByIdentifier,
    getTasks,
    saveTasks,
    getSession,
    saveSession,
    clearSession
  });
})();
