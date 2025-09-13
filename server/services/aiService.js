const OpenAI = require("openai");

// Initialize the OpenAI client
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Helper to decide if we are mocking
const isMock = process.env.MOCK_AI === "true";

// ---------- Analyze GitHub Logs ----------
async function analyzeLog(logContent) {
  if (!logContent) {
    throw new Error("Log content is empty.");
  }

  // Mock mode for testing without credits
  if (isMock) {
    return `🧪 [MOCK ANALYSIS MODE]  
Log snippet: "${logContent.slice(0, 80)}..."  
Issue detected: Missing npm script.  
Suggestion: Add "start" script to package.json.`;
  }

  // Real call
  const prompt = `
    You are an expert Senior DevOps Engineer. 
    Analyze the following GitHub Actions build log to identify the root cause of any errors or significant slowdowns.
    Provide a clear, concise summary of the problem and a step-by-step suggestion for how to fix it. 
    If there are no errors, state that the build was successful and suggest one potential performance improvement.
    Format your response in Markdown.

    Here is the log:
    ---
    ${logContent}
    ---
  `;

  try {
    const response = await openrouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // OSS / free model
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenRouter:", error);
    throw new Error("Failed to get analysis from OpenRouter.");
  }
}

// ---------- General Agent Query ----------
async function runAgentQuery(prompt) {
  if (!prompt) {
    throw new Error("Prompt is empty.");
  }

  // Mock mode for testing without credits
  if (isMock) {
    return `🧪 [MOCK AGENT MODE]  
Prompt received: "${prompt}"  
Mock reply: Pretend I'm an AI agent and give helpful answers.`;
  }

  try {
    const response = await openrouter.chat.completions.create({
      model: "openai/gpt-4.1-mini", // general-purpose model
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenRouter:", error);
    throw new Error("Failed to get response from OpenRouter.");
  }
}

module.exports = { analyzeLog, runAgentQuery };
