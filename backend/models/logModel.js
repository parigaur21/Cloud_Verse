const supabase = require("../config/supabaseClient");

const LOG_LEVELS = ["info", "warn", "error", "debug"];

async function initLogTable() {
  // DDL migrations handled directly via Supabase / MCP Server
  return;
}

/**
 * Insert a new log entry.
 */
async function createLog({ deploymentId, projectId, userId, level, message, source, metadata }) {
  const { data, error } = await supabase
    .from("system_logs")
    .insert([{
      level: LOG_LEVELS.includes(level) ? level : "info",
      message,
      metadata: { source: source || "system", ...(metadata || {}) },
      user_id: userId || null,
      project_id: projectId || null,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get logs with optional filters.
 */
async function getLogs({ deploymentId, projectId, userId, level, limit, offset } = {}) {
  let query = supabase
    .from("system_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset || 0, (offset || 0) + (limit || 100) - 1);

  if (projectId) query = query.eq("project_id", projectId);
  if (userId) query = query.eq("user_id", userId);
  if (level && LOG_LEVELS.includes(level)) query = query.eq("level", level);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/**
 * Delete logs older than a given number of days.
 */
async function purgeLogs(daysOld = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysOld);

  const { error, count } = await supabase
    .from("system_logs")
    .delete({ count: "exact" })
    .lt("created_at", cutoff.toISOString());

  if (error) throw error;
  return count || 0;
}

module.exports = {
  LOG_LEVELS,
  initLogTable,
  createLog,
  getLogs,
  purgeLogs,
};

