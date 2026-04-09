import fetch from "node-fetch";
import JSZip from "jszip";

const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";

/* -------------------------------
   MEMORY CACHE
-------------------------------- */

let cachedRepoUrl = null;
let cachedRepoCode = null;


/* -------------------------------
   CALL GROQ LLM
-------------------------------- */

async function callGroq(prompt) {

  const response = await fetch(GROQ_API, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert senior software engineer who analyzes GitHub repositories and explains codebases clearly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    }),
  });

  const data = await response.json();

  if (!data?.choices?.[0]) {
    console.error("❌ Groq API Error Response:\n", data);
    throw new Error("Invalid response from Groq API");
  }

  return data.choices[0].message.content;
}


/* -------------------------------
   FETCH REPOSITORY CODE
-------------------------------- */

async function fetchRepoCode(repoUrl) {

  /* Use cache if repo already loaded */

  if (cachedRepoUrl === repoUrl && cachedRepoCode) {
    return cachedRepoCode;
  }

  const parts = repoUrl.replace("https://github.com/", "").split("/");
  const owner = parts[0];
  const repo = parts[1];

  const zipUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;

  const res = await fetch(zipUrl);
  const buffer = await res.arrayBuffer();

  const zip = await JSZip.loadAsync(buffer);

  let codeSamples = "";
  let count = 0;

  for (const filename in zip.files) {

    if (count > 6) break;

    const file = zip.files[filename];

    if (
      filename.endsWith(".js") ||
      filename.endsWith(".ts") ||
      filename.endsWith(".py") ||
      filename.endsWith(".java") ||
      filename.endsWith(".json")
    ) {

      const content = await file.async("string");

      codeSamples += `\nFILE: ${filename}\n${content.slice(0, 1200)}\n`;

      count++;
    }
  }

  /* Save to memory cache */

  cachedRepoUrl = repoUrl;
  cachedRepoCode = codeSamples;

  return codeSamples;
}


/* -------------------------------
   REPOSITORY ANALYSIS
-------------------------------- */

export async function analyzeRepo(repoUrl) {

  const code = await fetchRepoCode(repoUrl);

  const prompt = `
You are an expert senior software engineer.

Analyze the following GitHub repository.

Repository URL:
${repoUrl}

Code samples:
${code}

Provide:

1. What this project does
2. Architecture overview
3. Key modules/components
4. Technologies used
5. Potential improvements
6. Possible bugs or weaknesses

Explain clearly like teaching a junior developer.
`;

  return await callGroq(prompt);
}


/* -------------------------------
   CHAT ABOUT REPOSITORY
-------------------------------- */

export async function chatWithRepo(repoUrl, question) {

  const code = await fetchRepoCode(repoUrl);

  const prompt = `
You are an AI developer assistant analyzing a GitHub repository.

Repository URL:
${repoUrl}

Repository code samples:
${code}

User question:
${question}

Answer based only on the repository code context.
If the answer cannot be determined from the code, say so clearly.
`;

  return await callGroq(prompt);
}


/* -------------------------------
   BUG DETECTION
-------------------------------- */

export async function detectBugs(repoUrl) {

  const code = await fetchRepoCode(repoUrl);

  const prompt = `
Analyze the following GitHub repository code.

Repository URL:
${repoUrl}

Code samples:
${code}

Find:

- Possible bugs
- Code smells
- Security issues
- Performance improvements
- Best practice violations
`;

  return await callGroq(prompt);
}