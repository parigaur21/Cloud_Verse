const {
  createDeployment,
  simulateLifecycle,
  getDeployments,
  getDeploymentById,
  deleteDeployment,
  transitionDeployment,
  VALID_STATUSES,
} = require("../services/deploymentService");

/**
 * POST /deploy
 * Create a new deployment and start the lifecycle simulation.
 */
const deploy = async (req, res) => {
  try {
    const { name, projectId, environment, source, githubUrl } = req.body || {};
    const userId = req.user ? req.user.id : null;

    const deployment = await createDeployment({ name, projectId, userId, environment, source, githubUrl });

    // Start lifecycle simulation
    simulateLifecycle(deployment.id);

    res.status(201).json({ success: true, deployment });
  } catch (err) {
    console.error("Deployment failed:", err.message);
    res.status(500).json({ error: "Could not initiate deployment" });
  }
};

/**
 * GET /deployments
 * List deployments. If authenticated, returns user's deployments only.
 */
const list = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const deployments = await getDeployments(userId);
    res.json({ success: true, deployments });
  } catch (err) {
    console.error("Failed to fetch deployments:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * GET /deployments/:id
 * Get a single deployment with full logs.
 */
const getOne = async (req, res) => {
  try {
    const deployment = await getDeploymentById(req.params.id);
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    res.json({ success: true, deployment });
  } catch (err) {
    console.error("Failed to fetch deployment:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * PATCH /deployments/:id/status
 * Manually transition a deployment status (e.g., for rollbacks or stops).
 */
const updateStatus = async (req, res) => {
  try {
    const { status, logs } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const result = await transitionDeployment(
      req.params.id,
      status,
      logs || [`Status manually changed to ${status}`]
    );

    if (!result) {
      return res.status(404).json({ error: "Deployment not found" });
    }

    res.json({ success: true, deployment: result });
  } catch (err) {
    console.error("Status update failed:", err.message);
    res.status(500).json({ error: "Failed to update deployment status" });
  }
};

/**
 * DELETE /deployments/:id
 * Delete a deployment.
 */
const remove = async (req, res) => {
  try {
    const deleted = await deleteDeployment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete deployment:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { deploy, list, getOne, updateStatus, remove };
