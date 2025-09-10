const OpenAI = require('openai');

// Initialize the OpenAI client
const openrouter = new OpenAI({
  // 1. Point to OpenRouter's API endpoint
  baseURL: "https://openrouter.ai/api/v1",
  // 2. Use the OpenRouter API key
  apiKey: process.env.OPENROUTER_API_KEY, 
});

async function analyzeLog(logContent) {
  if (!logContent) {
    throw new Error("Log content is empty.");
  }

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
      // 3. Use a free model available on OpenRouter
      // You can find more on the OpenRouter "Models" page
      model: "mistralai/mistral-7b-instruct", 
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenRouter:", error);
    throw new Error("Failed to get analysis from OpenRouter.");
  }
}

module.exports = { analyzeLog };