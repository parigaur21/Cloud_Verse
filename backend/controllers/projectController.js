const {
  createProject,
  getProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../models/projectModel");

/**
 * POST /projects
 * Create a new project for the authenticated user.
 */
const create = async (req, res) => {
  try {
    const { name, description, services } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Project name is required" });
    }

    const project = await createProject({
      userId: req.user.id,
      name,
      description,
      services,
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error("Create project error:", err.message);
    res.status(500).json({ error: "Failed to create project" });
  }
};

/**
 * GET /projects
 * List all projects for the authenticated user.
 */
const list = async (req, res) => {
  try {
    const projects = await getProjectsByUserId(req.user.id);
    res.json({ success: true, projects });
  } catch (err) {
    console.error("List projects error:", err.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

/**
 * GET /projects/:id
 * Get a single project by ID (must belong to the user).
 */
const getOne = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.user_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({ success: true, project });
  } catch (err) {
    console.error("Get project error:", err.message);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

/**
 * PUT /projects/:id
 * Update a project.
 */
const update = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.user_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updated = await updateProject(req.params.id, req.body);
    res.json({ success: true, project: updated });
  } catch (err) {
    console.error("Update project error:", err.message);
    res.status(500).json({ error: "Failed to update project" });
  }
};

/**
 * DELETE /projects/:id
 * Delete a project.
 */
const remove = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.user_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await deleteProject(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("Delete project error:", err.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

module.exports = { create, list, getOne, update, remove };
