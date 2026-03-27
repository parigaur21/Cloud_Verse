const express = require("express");
const { create, list, getOne, update, remove } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All project routes are protected
router.post("/projects", protect, create);
router.get("/projects", protect, list);
router.get("/projects/:id", protect, getOne);
router.put("/projects/:id", protect, update);
router.delete("/projects/:id", protect, remove);

module.exports = router;
