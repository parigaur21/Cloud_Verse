const express = require("express");
const { signup, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// Protected routes
router.get("/auth/me", protect, getMe);

module.exports = router;
