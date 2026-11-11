(() => {
  "use strict";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("O cliente Supabase não foi carregado.");
    return;
  }

  const client = window.supabase.createClient(
    "https://sckxdiahbvixlfywibku.supabase.co",
    "sb_publishable_KTNOrSykVJAWUzDsu8USqQ_kndo9C7a",
    {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    }
  );

  window.KanbanSupabase = Object.freeze({
    client,
    emailRedirectUrl: "https://blackghostt6.github.io/Kanban/login.html"
  });
})();
