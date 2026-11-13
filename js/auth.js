(() => {
  "use strict";

  const USERNAME_PATTERN = /^[a-zA-Z0-9._-]{3,30}$/;

  function getClient() {
    if (!window.KanbanSupabase || !window.KanbanSupabase.client) {
      throw new Error("Não foi possível conectar ao serviço de autenticação. Recarregue a página.");
    }
    return window.KanbanSupabase.client;
  }

  function normalizeEmail(email) {
    return email.trim().toLocaleLowerCase("pt-BR");
  }

  function validateRegistration({ name, email, username, password }) {
    if (!name || !email || !username || !password) return "Preencha todos os campos obrigatórios.";
    if (name.length < 2 || name.length > 80) return "O nome deve ter entre 2 e 80 caracteres.";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Informe um e-mail válido.";
    if (!USERNAME_PATTERN.test(username)) return "O nome de usuário deve ter de 3 a 30 caracteres (letras, números, ponto, hífen ou sublinhado).";
    if (password.length < 8 || password.length > 128) return "A senha deve ter entre 8 e 128 caracteres.";
    return "";
  }

  function getRegistrationError(error) {
    const code = String(error && error.code || "").toLocaleLowerCase("pt-BR");
    const message = String(error && error.message || "").toLocaleLowerCase("pt-BR");
    const details = [
      error && error.details,
      error && error.hint
    ].filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
    const searchableDetails = `${code} ${message} ${details}`;

    if (searchableDetails.includes("username") || searchableDetails.includes("profiles_username_lower_idx")) {
      return "Este nome de usuário já está em uso. Escolha outro.";
    }
    if (
      code === "email_exists" ||
      code === "user_already_exists" ||
      searchableDetails.includes("profiles_email_lower_idx") ||
      /(?:user|email(?: address)?) already (?:registered|exists)/i.test(searchableDetails) ||
      /email.*(?:duplicate|already exists)/i.test(searchableDetails)
    ) {
      return "Este e-mail já está cadastrado. Entre na sua conta ou use outro e-mail.";
    }
    if (error && error.code === "23505") {
      return "Este e-mail ou nome de usuário já está cadastrado. Verifique os dados e tente novamente.";
    }
    return error && error.message ? error.message : "Não foi possível criar a conta.";
  }

  async function registerUser(input) {
    const values = {
      name: input.name.trim(),
      email: normalizeEmail(input.email),
      username: input.username.trim().toLocaleLowerCase("pt-BR"),
      password: input.password
    };
    const validationError = validateRegistration(values);
    if (validationError) throw new Error(validationError);

    const { data: usernameAvailable, error: usernameError } = await getClient()
      .rpc("is_username_available", { candidate: values.username });
    if (usernameError) throw new Error(usernameError.message || "Não foi possível verificar o nome de usuário.");
    if (usernameAvailable !== true) {
      throw new Error("Este nome de usuário já está em uso. Escolha outro.");
    }

    const { data, error } = await getClient().auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { name: values.name, username: values.username },
        emailRedirectTo: window.KanbanSupabase.emailRedirectUrl
      }
    });
    if (error) throw new Error(getRegistrationError(error));
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      throw new Error("Este e-mail já está cadastrado. Entre na sua conta ou use outro e-mail.");
    }
    return { user: data.user, session: data.session };
  }

  async function login(email, password) {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail || !password) throw new Error("Informe seu e-mail e sua senha.");

    const { data, error } = await getClient().auth.signInWithPassword({
      email: normalizedEmail,
      password
    });
    if (error) throw new Error(error.message);
    return data.user;
  }

  async function getCurrentUser() {
    const client = getClient();
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError) throw new Error(sessionError.message);
    if (!sessionData.session) return null;

    const { data: userData, error: userError } = await client.auth.getUser();
    if (userError) throw new Error(userError.message);
    if (!userData.user) return null;

    const { data: profile, error: profileError } = await client
      .from("profiles")
      .select("name, username")
      .eq("id", userData.user.id)
      .single();
    if (profileError) throw new Error(profileError.message);

    return {
      id: userData.user.id,
      email: userData.user.email,
      name: profile.name,
      username: profile.username
    };
  }

  async function requireSession() {
    const user = await getCurrentUser();
    if (!user) {
      window.location.replace("login.html");
      return null;
    }
    return user;
  }

  async function logout() {
    const { error } = await getClient().auth.signOut();
    if (error) throw new Error(error.message);
    window.location.assign("login.html");
  }

  function setFormMessage(element, message, type) {
    element.textContent = message;
    element.dataset.type = type || "";
    element.hidden = !message;
  }

  async function initLoginPage() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    const message = document.getElementById("auth-message");
    try {
      if (await getCurrentUser()) {
        window.location.replace("index.html");
        return;
      }
    } catch (error) {
      setFormMessage(message, error.message || "Não foi possível verificar sua sessão.", "error");
    }

    const registerForm = document.getElementById("register-form");
    const loginPanel = document.getElementById("login-panel");
    const registerPanel = document.getElementById("register-panel");
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
        await login(
          document.getElementById("login-identifier").value,
          document.getElementById("login-password").value
        );
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
        const result = await registerUser({
          name: document.getElementById("register-name").value,
          email: document.getElementById("register-email").value,
          username: document.getElementById("register-username").value,
          password: document.getElementById("register-password").value
        });
        registerForm.reset();
        if (result.session) {
          window.location.assign("index.html");
          return;
        }
        registerPanel.hidden = true;
        loginPanel.hidden = false;
        document.getElementById("login-identifier").value = result.user.email;
        setFormMessage(message, "Conta criada. Confirme seu e-mail pelo link enviado para entrar.", "success");
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

  initLoginPage().catch(error => {
    const message = document.getElementById("auth-message");
    if (message) setFormMessage(message, error.message || "Não foi possível inicializar a autenticação.", "error");
    console.error("Falha ao inicializar a autenticação.", error);
  });
})();
