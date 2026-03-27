const supabase = require("../config/supabaseClient");

async function initProjectTable() {
  // handled by Supabase MCP
  return;
}

async function createProject({ userId, name, description, services }) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{
      user_id: userId,
      name,
      description: description || "",
      services: services || [],
      status: "active"
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getProjectsByUserId(userId) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function getProjectById(projectId) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || undefined;
}

async function updateProject(projectId, updates) {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deleteProject(projectId) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;
  return true;
}

module.exports = {
  initProjectTable,
  createProject,
  getProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
};
