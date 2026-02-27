require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Logging Configuration
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
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "cloudverse.db");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/deploy", limiter);

let db;

// Initialize Database
async function initDb() {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS deployments (
      id INTEGER PRIMARY KEY,
      status TEXT,
      logs TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  logger.info("Database initialized successfully");
}

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "cloudverse-backend",
    uptime: process.uptime(),
    db_connected: !!db,
  });
});

app.get("/deployments", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM deployments ORDER BY created_at DESC LIMIT 50");
    const formattedRows = rows.map(row => ({
      ...row,
      logs: JSON.parse(row.logs)
    }));
    res.json(formattedRows);
  } catch (error) {
    logger.error("Failed to fetch deployments", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/deploy", async (req, res) => {
  try {
    const id = Date.now();
    const initialLogs = JSON.stringify(["Build sequence initiated..."]);

    await db.run(
      "INSERT INTO deployments (id, status, logs) VALUES (?, ?, ?)",
      [id, "Building", initialLogs]
    );

    simulateDeployment(id);

    res.json({ id, status: "Building", logs: ["Build sequence initiated..."] });
  } catch (error) {
    logger.error("Deployment failed", error);
    res.status(500).json({ error: "Could not initiate deployment" });
  }
});

async function updateDeployment(id, status, newLogs) {
  try {
    const row = await db.get("SELECT logs FROM deployments WHERE id = ?", id);
    if (!row) return;

    let logs = JSON.parse(row.logs);
    logs = [...logs, ...newLogs];

    await db.run(
      "UPDATE deployments SET status = ?, logs = ? WHERE id = ?",
      [status, JSON.stringify(logs), id]
    );
  } catch (error) {
    logger.error(`Error updating deployment ${id}`, error);
  }
}

function simulateDeployment(id) {
  setTimeout(() => updateDeployment(id, "Testing", ["🔍 Running security scan...", "🧪 Running unit tests..."]), 3000);

  setTimeout(() => {
    const failed = Math.random() < 0.2;
    if (failed) {
      updateDeployment(id, "Failed", ["❌ Error: Test suite failed in module 'core-api'", "⚠️ Stack trace logged to cloud-watch"]);
    } else {
      updateDeployment(id, "Deploying", ["📦 Packaging assets...", "🚀 Pushing to edge nodes..."]);

      setTimeout(() => {
        updateDeployment(id, "Completed", ["✅ Deployment successful!", "🌐 App live at: https://cv-instance-" + id.toString().slice(-4) + ".cloudverse.io"]);
      }, 3000);
    }
  }, 6000);
}

// Start Server
initDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`🚀 CloudVerse Engine running on port ${PORT}`);
  });
});