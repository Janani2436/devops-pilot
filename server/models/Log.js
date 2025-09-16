// server/models/Log.js
const mongoose = require("mongoose");

// Define the schema for logs
const logSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // The actual log content
    },
    analysis: {
      type: String, // AI-generated analysis
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto timestamp
    },
  },
  { collection: "logs" } // Explicit collection name (optional)
);

// Export the model
module.exports = mongoose.model("Log", logSchema);
