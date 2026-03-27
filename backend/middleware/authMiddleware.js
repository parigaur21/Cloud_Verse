const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "cloudverse-super-secret-key-change-me";

/**
 * Middleware to protect routes — verifies JWT from Authorization header.
 * Attaches decoded user payload to req.user on success.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized — no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized — invalid or expired token" });
  }
};

/**
 * Middleware to restrict access to specific roles.
 * Must be used AFTER the `protect` middleware.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden — insufficient permissions" });
    }
    next();
  };
};

/**
 * Generate a signed JWT for a user.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { protect, authorize, generateToken, JWT_SECRET };
