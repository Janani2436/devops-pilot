// 1. Configuration: This MUST be the first line to load environment variables
// require("dotenv").config({ path: "../.env" });
require("dotenv").config();

// 2. Imports: Bring in all the libraries and modules we need
const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/github.js");
const agentRoutes = require("./routes/agent.js");

// 3. Initialization: Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware: Set up how the app behaves
app.use(cors()); // Allow requests from other origins (like your React app)
app.use(express.json()); // Allow the app to understand JSON

// 5. Routes: Tell the app to use the API endpoints we created
app.use("/api/github", githubRoutes);

// Register the new route
app.use("/api/agents", agentRoutes);

// A simple test route to make sure the server is working
app.get("/", (req, res) => {
  res.send("Welcome to the DevOps Pilot API! 🚀");
});

// 6. Start the Server: Make the app listen for requests
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
