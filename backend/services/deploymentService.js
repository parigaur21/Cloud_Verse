const supabase = require("../config/supabaseClient");

// ── Deployment Lifecycle States ──────────────────────────────
// queued → building → running → failed
const VALID_STATUSES = ["queued", "building", "testing", "deploying", "running", "failed", "stopped"];

async function initDeploymentTable() {
  // DDL migrations handled directly via Supabase / MCP Server
  return;
}

/**
 * Create a new deployment in "queued" status.
 */
async function createDeployment({ name, projectId, userId, environment, source, githubUrl }) {
  const shortId = Date.now().toString().slice(-4);
  const finalName = name || `cv-instance-${shortId}`;
  
  const initialLogs = source === "github" 
    ? [`📋 Deployment queued...`, `🔗 Source: GitHub → ${githubUrl}`]
    : source === "upload"
    ? [`📋 Deployment queued...`, `📁 Source: Manual Upload`]
    : [`📋 Deployment queued...`];

  const row = {
    name: finalName,
    project_id: projectId || null,
    user_id: userId || null,
    status: "queued",
    logs: initialLogs,
    environment: environment || "production",
    source: source || "manual",
    github_url: githubUrl || null,
  };

  const { data, error } = await supabase
    .from("deployments")
    .insert([row])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Transition deployment through its lifecycle.
 */
async function transitionDeployment(id, newStatus, newLogs) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  // Fetch current
  const { data: row, error: fetchError } = await supabase
    .from("deployments")
    .select("logs, status")
    .eq("id", id)
    .single();

  if (fetchError || !row) return null;

  let logs = Array.isArray(row.logs) ? row.logs : [];
  logs = [...logs, ...newLogs];

  const { data, error } = await supabase
    .from("deployments")
    .update({ status: newStatus, logs })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Simulate the full deployment lifecycle:
 * queued → building → testing → deploying → running|failed
 */
function simulateLifecycle(id) {
  // queued → building (1s)
  setTimeout(() => {
    transitionDeployment(id, "building", ["🔨 Building container image...", "📦 Installing dependencies..."]).catch(console.error);
  }, 1000);

  // building → testing (4s)
  setTimeout(() => {
    transitionDeployment(id, "testing", ["🔍 Running security scan...", "🧪 Running unit tests..."]).catch(console.error);
  }, 4000);

  // testing → deploying or failed (7s)
  setTimeout(() => {
    const failed = Math.random() < 0.1;
    if (failed) {
      transitionDeployment(id, "failed", [
        "❌ Error: Test suite failed in module 'core-api'",
        "⚠️ Stack trace logged to cloud-watch",
      ]).catch(console.error);
    } else {
      transitionDeployment(id, "deploying", ["📦 Packaging assets...", "🚀 Pushing to edge nodes..."]).catch(console.error);

      // deploying → running (10s)
      setTimeout(() => {
        transitionDeployment(id, "running", [
          "✅ Deployment successful!",
          `🌐 App live at: https://cv-instance-${id.toString().substring(0,6)}.cloudverse.io`,
        ]).catch(console.error);
      }, 3000);
    }
  }, 7000);
}

/**
 * Get all deployments, optionally filtered by userId.
 */
async function getDeployments(userId) {
  let query = supabase
    .from("deployments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;
  if (error) throw error;
  
  return (data || []).map(row => ({
    ...row,
    logs: Array.isArray(row.logs) ? row.logs : []
  }));
}

/**
 * Get a single deployment by ID.
 */
async function getDeploymentById(id) {
  const { data, error } = await supabase
    .from("deployments")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  if (data) {
    data.logs = Array.isArray(data.logs) ? data.logs : [];
  }
  return data || undefined;
}

/**
 * Delete a deployment by ID.
 */
async function deleteDeployment(id) {
  const { error, count } = await supabase
    .from("deployments")
    .delete({ count: 'exact' })
    .eq("id", id);

  if (error) throw error;
  return count > 0;
}

module.exports = {
  VALID_STATUSES,
  initDeploymentTable,
  createDeployment,
  transitionDeployment,
  simulateLifecycle,
  getDeployments,
  getDeploymentById,
  deleteDeployment,
};
