// agentController.js
const { analyzeLog, runAgentQuery } = require("../services/aiService.js");
const Log = require("../models/log.js"); // <-- import Log model

// Analyze logs and save result to MongoDB
async function analyzeLogController(req, res) {
  const { logContent } = req.body;

  if (!logContent) {
    return res
      .status(400)
      .json({ error: "logContent is required in request body." });
  }

  try {
    const analysis = await analyzeLog(logContent);

    // Save to MongoDB Atlas
    const newLog = await Log.create({
      content: logContent,
      analysis,
    });

    res.json({ success: true, log: newLog });
  } catch (error) {
    console.error("Error in analyzeLogController:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Run agent queries (no DB persistence here, just AI response)
async function runAgent(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Agent received prompt:", prompt);

    const response = await runAgentQuery(prompt);

    res.json({ success: true, response });
  } catch (err) {
    console.error("Agent error:", err.message);
    res.status(500).json({ error: "Failed to process AI request" });
  }
}

module.exports = { analyzeLogController, runAgent };
