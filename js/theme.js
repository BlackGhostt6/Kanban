(() => {
  "use strict";

  const STORAGE_KEY = "dayboard-theme";
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let theme = "light";

  try {
    theme = window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Não foi possível ler a preferência de tema.", error);
  }

  function updateTheme(nextTheme) {
    theme = nextTheme;
    root.dataset.theme = theme;
    if (themeColor) themeColor.content = theme === "dark" ? "#10151b" : "#f5f7f9";

    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const nextLabel = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
      button.setAttribute("aria-label", nextLabel);
      button.setAttribute("title", nextLabel);
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.innerHTML = theme === "dark"
        ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.8v2M12 19.2v2M21.2 12h-2M4.8 12h-2m15.7-6.5-1.4 1.4M6.9 17.1l-1.4 1.4m12.9 0-1.4-1.4M6.9 6.9 5.5 5.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 15.1A8.4 8.4 0 0 1 8.9 3.8 8.4 8.4 0 1 0 20.2 15.1Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
  }

  updateTheme(theme);

  document.addEventListener("DOMContentLoaded", () => {
    updateTheme(theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        updateTheme(nextTheme);
        try {
          window.localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch (error) {
          console.error("Não foi possível salvar a preferência de tema.", error);
        }
      });
    });
  });
})();
