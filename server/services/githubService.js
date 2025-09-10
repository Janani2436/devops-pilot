const axios = require('axios');
const AdmZip = require('adm-zip'); // <-- Import the new library

async function fetchLatestWorkflowLog(owner, repo) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not found.');
  }

  try {
    const runsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      }
    );

    const latestRun = runsResponse.data.workflow_runs[0];
    if (!latestRun) {
      throw new Error('No workflow runs found.');
    }

    // --- NEW LOGIC STARTS HERE ---

    // Step 2: Get the log ZIP archive as a raw buffer of data
    const logZipResponse = await axios.get(latestRun.logs_url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      responseType: 'arraybuffer', // <-- Important: We want the raw file data
    });

    // Step 3: Unzip the buffer in memory
    const zip = new AdmZip(logZipResponse.data);
    const zipEntries = zip.getEntries(); // Get a list of files in the zip

    if (zipEntries.length > 0) {
      // Step 4: Read the content of the first file in the zip
      const logContent = zipEntries[0].getData().toString('utf8');
      return logContent;
    } else {
      throw new Error('ZIP archive was empty.');
    }

  } catch (error) {
    console.error('Error fetching GitHub log:', error.message);
    throw new Error('Failed to fetch and process workflow log from GitHub.');
  }
}

module.exports = { fetchLatestWorkflowLog };