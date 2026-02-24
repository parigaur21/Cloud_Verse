require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let deployments = [];

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "cloudverse-backend",
    environment: process.env.NODE_ENV,
  });
});

app.get("/deployments", (req, res) => {
  res.json(deployments);
});

app.post("/deploy", (req, res) => {
  const id = Date.now();

  const newDeployment = {
    id,
    status: "Building",
    logs: ["Build started..."],
  };

  deployments.push(newDeployment);

  simulateDeployment(id);

  res.json(newDeployment);
});

function simulateDeployment(id) {
  const deployment = deployments.find((d) => d.id === id);
  if (!deployment) return;

  setTimeout(() => {
    deployment.status = "Testing";
    deployment.logs.push("Running tests...");
  }, 3000);

  setTimeout(() => {
    const failed = Math.random() < 0.3;

    if (failed) {
      deployment.status = "Failed";
      deployment.logs.push("❌ Tests failed. Deployment aborted.");
      return;
    }

    deployment.status = "Deploying";
    deployment.logs.push("Deploying to production...");
  }, 6000);

  setTimeout(() => {
    if (deployment.status !== "Failed") {
      deployment.status = "Completed";
      deployment.logs.push("Deployment successful 🚀");
    }
  }, 9000);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});