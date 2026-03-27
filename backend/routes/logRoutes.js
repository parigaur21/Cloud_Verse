const express = require("express");
const { create, list, purge } = require("../controllers/logController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a log (protected)
router.post("/logs", protect, create);

// List logs (protected)
router.get("/logs", protect, list);

// Purge old logs (admin only)
router.delete("/logs/purge", protect, authorize("admin"), purge);

module.exports = router;
