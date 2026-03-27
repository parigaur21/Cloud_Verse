const supabase = require("../config/supabaseClient");

async function initUserTable() {
  // DDL migrations handled directly via Supabase / MCP Server
  return;
}

async function createUser({ username, email, password }) {
  const { data, error } = await supabase
    .from("app_users")
    .insert([{ username, email, password, role: "user" }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw new Error('UNIQUE constraint failed');
    throw error;
  }
  return data;
}

async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows
  return data || undefined;
}

async function findUserByUsername(username) {
  const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("username", username)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || undefined;
}

async function findUserById(id) {
  const { data, error } = await supabase
    .from("app_users")
    .select("id, username, email, role, created_at")
    .eq("id", id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || undefined;
}

module.exports = {
  initUserTable,
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
};
