const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let deployments = [];

/*
----------------------------------------
GET ALL DEPLOYMENTS
----------------------------------------
*/
app.get("/deployments", (req, res) => {
  res.json(deployments);
});

/*
----------------------------------------
CREATE NEW DEPLOYMENT
----------------------------------------
*/
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

/*
----------------------------------------
SIMULATE CI/CD PIPELINE
----------------------------------------
*/
function simulateDeployment(id) {
  const deployment = deployments.find((d) => d.id === id);

  if (!deployment) return;

  // Step 1 → Testing
  setTimeout(() => {
    deployment.status = "Testing";
    deployment.logs.push("Running tests...");
  }, 3000);

  // Step 2 → Fail or Deploying
  setTimeout(() => {
    const failed = Math.random() < 0.3; // 30% chance + test fail hona + build break hoti h + deployment crash !!

    if (failed) {
      deployment.status = "Failed";
      deployment.logs.push("❌ Tests failed. Deployment aborted.");
      return;
    }

    deployment.status = "Deploying";
    deployment.logs.push("Deploying to production...");
  }, 6000);

  // Step 3 → Completed
  setTimeout(() => {
    if (deployment.status !== "Failed") {
      deployment.status = "Completed";
      deployment.logs.push("Deployment successful 🚀");
    }
  }, 9000);
}

/*
----------------------------------------
START SERVER
----------------------------------------
*/
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
