// 1. Configuration: This MUST be the first line to load environment variables
require("dotenv").config();

// 2. Imports: Bring in all the libraries and modules we need
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // <-- add mongoose
const githubRoutes = require("./routes/github.js");
const agentRoutes = require("./routes/agent.js");

// 3. Initialization: Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware: Set up how the app behaves
app.use(cors()); // Allow requests from other origins (like your React app)
app.use(express.json()); // Allow the app to understand JSON

// 5. Database: Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI; // keep your URI in .env
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// 6. Routes: Tell the app to use the API endpoints we created
app.use("/api/github", githubRoutes);
app.use("/api/agents", agentRoutes);

// A simple test route to make sure the server is working
app.get("/", (req, res) => {
  res.send("Welcome to the DevOps Pilot API! 🚀");
});

// 7. Start the Server: Make the app listen for requests
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
