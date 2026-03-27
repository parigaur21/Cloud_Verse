const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-local-dev",
});

const askDevOpsAI = async (prompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a DevOps expert. Help debug deployments, logs, and backend systems. Provide clear, actionable responses with structured sections for Issue, Cause, and Fix.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { askDevOpsAI };
