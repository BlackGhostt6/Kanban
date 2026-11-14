(() => {
  "use strict";

  async function invoke(action, values) {
    const client = window.KanbanSupabase && window.KanbanSupabase.client;
    if (!client) throw new Error("Não foi possível conectar ao Supabase.");

    const { data, error } = await client.functions.invoke("ai-chat", {
      body: { action, ...values }
    });
    if (error) {
      let message = error.message || "Não foi possível consultar o assistente.";
      if (error.context instanceof Response) {
        const responseBody = await error.context.clone().json().catch(() => null);
        if (responseBody && typeof responseBody.error === "string") message = responseBody.error;
      }
      throw new Error(message);
    }
    if (!data || typeof data !== "object") {
      throw new Error("O serviço de IA retornou uma resposta inválida.");
    }
    return data;
  }

  window.KanbanAI = Object.freeze({
    askProject(projectId, question, history) {
      return invoke("chat", { projectId, question, history });
    },
    generateSubtasks(taskId) {
      return invoke("generate_subtasks", { taskId });
    },
    saveSubtasks(taskId, subtasks) {
      return invoke("save_subtasks", { taskId, subtasks });
    },
  });
})();
