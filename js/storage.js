(() => {
  "use strict";

  function getClient() {
    if (!window.KanbanSupabase || !window.KanbanSupabase.client) {
      throw new Error("Não foi possível conectar ao serviço de dados. Recarregue a página.");
    }
    return window.KanbanSupabase.client;
  }

  function throwIfError(error) {
    if (error) throw new Error(error.message || "O serviço de dados retornou um erro.");
  }

  function toTask(row) {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      createdAt: row.created_at
    };
  }

  async function getTasks() {
    const { data, error } = await getClient()
      .from("tasks")
      .select("id, title, description, status, created_at")
      .order("created_at", { ascending: false });
    throwIfError(error);
    return data.map(toTask);
  }

  async function createTask(task) {
    const { data, error } = await getClient()
      .from("tasks")
      .insert({
        title: task.title,
        description: task.description,
        status: task.status
      })
      .select("id, title, description, status, created_at")
      .single();
    throwIfError(error);
    return toTask(data);
  }

  async function updateTask(taskId, changes) {
    const { data, error } = await getClient()
      .from("tasks")
      .update(changes)
      .eq("id", taskId)
      .select("id, title, description, status, created_at")
      .single();
    throwIfError(error);
    return toTask(data);
  }

  async function deleteTask(taskId) {
    const { data, error } = await getClient()
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select("id")
      .single();
    throwIfError(error);
    return data.id;
  }

  window.KanbanStorage = Object.freeze({
    getTasks,
    createTask,
    updateTask,
    deleteTask
  });
})();
