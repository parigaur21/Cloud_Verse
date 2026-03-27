const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail, findUserByUsername, findUserById } = require("../models/userModel");
const { generateToken } = require("../middleware/authMiddleware");

/**
 * POST /auth/signup
 * Register a new user.
 */
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required: username, email, password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: "Username already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await createUser({ username, email, password: hashedPassword });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Server error during signup" });
  }
};

/**
 * POST /auth/login
 * Authenticate user and return JWT.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

/**
 * GET /auth/me
 * Get current user profile (protected route).
 */
const getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("GetMe error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, login, getMe };
