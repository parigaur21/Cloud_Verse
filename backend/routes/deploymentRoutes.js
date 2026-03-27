const express = require("express");
const { deploy, list, getOne, updateStatus, remove } = require("../controllers/deploymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Deploy — optionally protected (works with or without auth)
router.post("/deploy", (req, res, next) => {
  // Allow unauthenticated deploys for backward compatibility
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return protect(req, res, next);
  }
  next();
}, deploy);

// Deployment management
router.get("/deployments", list);
router.get("/deployments/:id", getOne);
router.patch("/deployments/:id/status", protect, updateStatus);
router.delete("/deployments/:id", protect, remove);

module.exports = router;
