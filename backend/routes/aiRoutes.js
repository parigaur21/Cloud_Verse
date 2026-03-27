const express = require("express");
const { devopsAssistant } = require("../controllers/aiController");

const router = express.Router();

router.post("/ai/devops", devopsAssistant);

module.exports = router;
