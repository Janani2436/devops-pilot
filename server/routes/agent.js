const express = require("express");
const router = express.Router();
const {
  analyzeLogController,
  runAgent,
} = require("../controllers/agentController");

// Route for log analysis
router.post("/analyze-log", analyzeLogController);

// Route for free-form agent queries
router.post("/", runAgent);

module.exports = router;
