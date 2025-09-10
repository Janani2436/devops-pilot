const express = require('express');
const router = express.Router();
const { fetchLatestWorkflowLog } = require('../services/githubService.js');
const { analyzeLog } = require('../services/aiService.js'); // <-- Import the new AI service

router.get('/logs/latest', async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Owner and repo query parameters are required.' });
  }

  try {
    // Step 1: Fetch the log content from GitHub
    const logContent = await fetchLatestWorkflowLog(owner, repo);

    // Step 2: Send the log content to the AI for analysis
    const analysis = await analyzeLog(logContent);

    // Step 3: Send the AI's analysis back as the response
    res.json({ analysis: analysis });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;