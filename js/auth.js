(() => {
  "use strict";

  const ITERATIONS = 210000;
  const HASH_LENGTH = 256;
  const HASH_ALGORITHM = "SHA-256";
  const STORAGE = window.KanbanStorage;
  const encoder = new TextEncoder();

  function requireCrypto() {
    if (!window.crypto || !window.crypto.subtle || typeof window.crypto.getRandomValues !== "function") {
      throw new Error("Este navegador não oferece Web Crypto. Acesse o site por HTTPS ou localhost em um navegador atualizado.");
    }
  }

  function toHex(bytes) {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function fromHex(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
    }
    return bytes;
  }

  function randomHex(byteLength) {
    requireCrypto();
    const bytes = new Uint8Array(byteLength);
    window.crypto.getRandomValues(bytes);
    return toHex(bytes);
  }

  async function derivePasswordHash(password, saltHex, iterations) {
    requireCrypto();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits({
      name: "PBKDF2",
      salt: fromHex(saltHex),
      iterations,
      hash: HASH_ALGORITHM
    }, keyMaterial, HASH_LENGTH);
    return toHex(new Uint8Array(bits));
  }

  function hashesMatch(left, right) {
    if (left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) {
      difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return difference === 0;
  }

  function normalizeEmail(email) {
    return email.trim().toLocaleLowerCase("pt-BR");
  }

  function publicUser(user) {
    return { id: user.id, name: user.name, email: user.email, username: user.username };
  }

  function validateRegistration({ name, email, username, password }) {
    if (!name || !email || !username || !password) return "Preencha todos os campos obrigatórios.";
    if (name.length < 2 || name.length > 80) return "O nome deve ter entre 2 e 80 caracteres.";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Informe um e-mail válido.";
    if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) return "O nome de usuário deve ter de 3 a 30 caracteres (letras, números, ponto, hífen ou sublinhado).";
    if (password.length < 8 || password.length > 128) return "A senha deve ter entre 8 e 128 caracteres.";
    return "";
  }

  async function registerUser(input) {
    const values = {
      name: input.name.trim(),
      email: normalizeEmail(input.email),
      username: input.username.trim(),
      password: input.password
    };
    const validationError = validateRegistration(values);
    if (validationError) throw new Error(validationError);

    const users = STORAGE.getUsers();
    const duplicate = users.some(user => user.email.toLocaleLowerCase("pt-BR") === values.email ||
      user.username.toLocaleLowerCase("pt-BR") === values.username.toLocaleLowerCase("pt-BR"));
    if (duplicate) throw new Error("Já existe uma conta com esse e-mail ou nome de usuário.");

    const salt = randomHex(16);
    const hash = await derivePasswordHash(values.password, salt, ITERATIONS);
    const user = {
      id: randomHex(16),
      name: values.name,
      email: values.email,
      username: values.username,
      password: {
        algorithm: "PBKDF2",
        hashAlgorithm: HASH_ALGORITHM,
        iterations: ITERATIONS,
        keyLength: HASH_LENGTH,
        salt,
        hash
      }
    };

    if (!STORAGE.saveUsers([...users, user])) {
      throw new Error("Não foi possível salvar a conta neste navegador. Verifique as configurações de armazenamento.");
    }
    return publicUser(user);
  }

  async function login(identifier, password) {
    const normalizedIdentifier = identifier.trim();
    if (!normalizedIdentifier || !password) throw new Error("Informe seu e-mail ou usuário e sua senha.");

    const user = STORAGE.findUserByIdentifier(normalizedIdentifier);
    const salt = user ? user.password.salt : "00000000000000000000000000000000";
    const expectedHash = user ? user.password.hash : "";
    const iterations = user ? user.password.iterations : ITERATIONS;
    const actualHash = await derivePasswordHash(password, salt, iterations);

    if (!user || !hashesMatch(actualHash, expectedHash)) {
      throw new Error("E-mail/usuário ou senha incorretos.");
    }

    const session = {
      id: randomHex(32),
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    if (!STORAGE.saveSession(session)) {
      throw new Error("Não foi possível iniciar a sessão neste navegador.");
    }
    return publicUser(user);
  }

  function getCurrentUser() {
    const session = STORAGE.getSession();
    if (!session) return null;
    const user = STORAGE.findUserById(session.userId);
    return user ? publicUser(user) : null;
  }

  function requireSession() {
    const user = getCurrentUser();
    if (!user) {
      STORAGE.clearSession();
      window.location.replace("login.html");
      return null;
    }
    return user;
  }

  function logout() {
    STORAGE.clearSession();
    window.location.assign("login.html");
  }

  function setFormMessage(element, message, type) {
    element.textContent = message;
    element.dataset.type = type || "";
    element.hidden = !message;
  }

  function initLoginPage() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    if (getCurrentUser()) {
      window.location.replace("index.html");
      return;
    }

    const registerForm = document.getElementById("register-form");
    const loginPanel = document.getElementById("login-panel");
    const registerPanel = document.getElementById("register-panel");
    const message = document.getElementById("auth-message");
    const loginButton = loginForm.querySelector("button[type='submit']");
    const loginButtonLabel = loginButton.querySelector("span");
    const registerButton = registerForm.querySelector("button[type='submit']");
    const registerButtonLabel = registerButton.querySelector("span");

    document.getElementById("show-register").addEventListener("click", () => {
      loginPanel.hidden = true;
      registerPanel.hidden = false;
      setFormMessage(message, "", "");
      document.getElementById("register-name").focus();
    });
    document.getElementById("show-login").addEventListener("click", () => {
      registerPanel.hidden = true;
      loginPanel.hidden = false;
      setFormMessage(message, "", "");
      document.getElementById("login-identifier").focus();
    });

    document.querySelectorAll("[data-toggle-password]").forEach(button => {
      button.addEventListener("click", () => {
        const field = document.getElementById(button.dataset.togglePassword);
        const willShow = field.type === "password";
        field.type = willShow ? "text" : "password";
        button.setAttribute("aria-pressed", String(willShow));
        button.setAttribute("aria-label", willShow ? "Ocultar senha" : "Mostrar senha");
      });
    });

    loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;
      setFormMessage(message, "Verificando seus dados...", "info");
      loginButton.disabled = true;
      loginButtonLabel.textContent = "Entrando...";
      try {
        await login(document.getElementById("login-identifier").value, document.getElementById("login-password").value);
        window.location.assign("index.html");
      } catch (error) {
        setFormMessage(message, error.message || "Não foi possível entrar. Tente novamente.", "error");
      } finally {
        loginButton.disabled = false;
        loginButtonLabel.textContent = "Entrar";
      }
    });

    registerForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!registerForm.reportValidity()) return;
      setFormMessage(message, "Criando sua conta...", "info");
      registerButton.disabled = true;
      registerButtonLabel.textContent = "Criando conta...";
      try {
        const user = await registerUser({
          name: document.getElementById("register-name").value,
          email: document.getElementById("register-email").value,
          username: document.getElementById("register-username").value,
          password: document.getElementById("register-password").value
        });
        document.getElementById("login-identifier").value = user.email;
        registerForm.reset();
        registerPanel.hidden = true;
        loginPanel.hidden = false;
        setFormMessage(message, "Conta criada. Entre com seu e-mail ou nome de usuário.", "success");
        document.getElementById("login-password").focus();
      } catch (error) {
        setFormMessage(message, error.message || "Não foi possível criar a conta.", "error");
      } finally {
        registerButton.disabled = false;
        registerButtonLabel.textContent = "Criar conta";
      }
    });
  }

  window.KanbanAuth = Object.freeze({
    registerUser,
    login,
    getCurrentUser,
    requireSession,
    logout
  });

  initLoginPage();
})();
