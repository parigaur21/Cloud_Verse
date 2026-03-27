require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// ── Route Imports ────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const logRoutes = require("./routes/logRoutes");

// ── Supabase Client (validates env on import) ────────────────
const supabase = require("./config/supabaseClient");

// ── Logging Configuration ───────────────────────────────────
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middlewares ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// ── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/deploy", limiter);
app.use("/ai", limiter);
app.use("/auth", limiter);

// ── Routes ──────────────────────────────────────────────────
app.use(authRoutes);
app.use(projectRoutes);
app.use(deploymentRoutes);
app.use(aiRoutes);
app.use(logRoutes);

// ── Health Check & Root Message ─────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "cloudverse-backend",
    database: "Supabase Postgres",
    uptime: process.uptime(),
    version: "3.0.0",
  });
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>CloudVerse API</title></head>
      <body style="font-family: sans-serif; padding: 2rem; background:#030305; color:#fff;">
        <h2>🚀 CloudVerse Backend API v3 is Running!</h2>
        <p>Database: <b>Supabase Postgres</b></p>
        <p>If you're running locally, the React UI is at <b>http://localhost:5173</b></p>
      </body>
    </html>
  `);
});

// ── Ping Supabase & Start Server ─────────────────────────────
async function startServer() {
  // Quick connectivity check
  const { error } = await supabase.from("app_users").select("id").limit(1);
  if (error && error.code !== 'PGRST116') {
    logger.error("Failed to connect to Supabase:", error.message);
    process.exit(1);
  }
  logger.info("✅ Supabase connection verified");

  const server = app.listen(PORT, "0.0.0.0", () => {
    logger.info(`🚀 CloudVerse Engine v3.0 (Supabase) running on port ${PORT}`);
    logger.info(`📋 Auth:        POST /auth/signup, POST /auth/login, GET /auth/me`);
    logger.info(`📁 Projects:    CRUD /projects`);
    logger.info(`🚀 Deployments: POST /deploy, GET /deployments, PATCH /deployments/:id/status`);
    logger.info(`🤖 AI:          POST /ai/devops`);
    logger.info(`📝 Logs:        POST /logs, GET /logs, DELETE /logs/purge`);
  });

  // Graceful Shutdown
  const shutdown = async () => {
    logger.info("Shutdown signal received. Closing server...");
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});