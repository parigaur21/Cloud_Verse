const { createLog, getLogs, purgeLogs, LOG_LEVELS } = require("../models/logModel");

/**
 * POST /logs
 * Create a new log entry.
 */
const create = async (req, res) => {
  try {
    const { deploymentId, projectId, level, message, source, metadata } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Log message is required" });
    }

    const userId = req.user ? req.user.id : null;

    const log = await createLog({
      deploymentId,
      projectId,
      userId,
      level,
      message,
      source,
      metadata,
    });

    res.status(201).json({ success: true, log });
  } catch (err) {
    console.error("Create log error:", err.message);
    res.status(500).json({ error: "Failed to create log entry" });
  }
};

/**
 * GET /logs
 * Fetch logs with optional query filters.
 * Query params: deploymentId, projectId, level, limit, offset
 */
const list = async (req, res) => {
  try {
    const { deploymentId, projectId, level, limit, offset } = req.query;
    const userId = req.user ? req.user.id : null;

    const logs = await getLogs({
      deploymentId: deploymentId ? parseInt(deploymentId) : undefined,
      projectId: projectId ? parseInt(projectId) : undefined,
      userId,
      level,
      limit: limit ? parseInt(limit) : 100,
      offset: offset ? parseInt(offset) : 0,
    });

    res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    console.error("Fetch logs error:", err.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

/**
 * DELETE /logs/purge
 * Purge logs older than N days (default: 30).
 * Query params: days
 */
const purge = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const deletedCount = await purgeLogs(days);
    res.json({ success: true, message: `Purged ${deletedCount} log entries older than ${days} days` });
  } catch (err) {
    console.error("Purge logs error:", err.message);
    res.status(500).json({ error: "Failed to purge logs" });
  }
};

module.exports = { create, list, purge };
