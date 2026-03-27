const { askDevOpsAI } = require("../services/aiService");

const devopsAssistant = async (req, res) => {
  try {
    const { query, logs } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Missing required field: query" });
    }

    const prompt = `
User Query:
${query}

Logs:
${logs || "No logs provided."}

Analyze and give:
- Issue
- Cause
- Fix
`;

    const result = await askDevOpsAI(prompt);

    res.json({ success: true, result });
  } catch (err) {
    console.error("AI DevOps Assistant error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { devopsAssistant };
