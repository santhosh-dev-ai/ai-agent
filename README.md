# AI Codebase Explainer Agent

An autonomous AI agent that analyzes GitHub repositories, explains project structure, detects potential bugs, and answers developer questions about the codebase.

This project implements the **gitagent architecture**, where the AI agent is defined through configuration files and modular skills.

---

## Features

* Analyze GitHub repositories
* Explain project architecture
* Detect potential bugs
* Suggest improvements
* Answer developer questions about the codebase
* Modular skill-based AI agent design
* Interactive CLI agent with exit command

---

## Agent Architecture

The agent is defined using the gitagent structure.

```
agent/
├── agent.yaml
├── SOUL.md
├── RULES.md
└── skills/
    └── repo-analysis/
        └── SKILL.md
```

### Agent Components

**agent.yaml**

* Defines the agent configuration and capabilities.

**SOUL.md**

* Defines the identity and personality of the AI agent.

**RULES.md**

* Defines the behavioral constraints and safety rules.

**SKILL.md**

* Defines the capabilities of the agent.

---

## Project Structure

```
ai-agent/
│
├── agent/
│   ├── agent.yaml
│   ├── SOUL.md
│   ├── RULES.md
│   └── skills/
│       └── repo-analysis/
│           └── SKILL.md
│
├── aiService.js
├── index.js
├── package.json
└── README.md
```

---

## How It Works

1. The user provides a GitHub repository URL.
2. The AI agent downloads and analyzes the repository code.
3. The agent generates insights such as:

   * project overview
   * architecture explanation
   * bug detection
   * improvement suggestions

The AI reasoning is powered by **Groq LLM (LLaMA 3.1)**.

---

## Installation

Install dependencies:

```
npm install
```

---

## Environment Variables

Create a `.env` file in the project root and add your Groq API key.

Example:

```
GROQ_API_KEY=your_groq_api_key_here
```

You can generate an API key from:

https://console.groq.com/keys

Make sure the `.env` file is **not committed to GitHub**.

---

## Run the Agent

Start the AI agent:

```
node index.js
```

Enter a GitHub repository URL when prompted.

Example:

```
https://github.com/facebook/react
```

---

## Agent Commands

Once the repository is loaded, you can interact with the agent:

```
analyze
```

Explains the repository architecture.

```
bugs
```

Detects possible bugs and issues.

```
question
```

Ask questions about the codebase.

```
exit
```

Stops the AI agent and exits the program.

---

## Example Workflow

```
node index.js

Enter GitHub Repo URL:
https://github.com/facebook/react

Ask something:
analyze

Ask something:
bugs

Ask something:
exit
```

The agent will analyze the repository and exit when requested.

---

## Tech Stack

* Node.js
* JavaScript
* Groq LLM (LLaMA 3.1)
* Gitagent architecture
* JSZip (repository extraction)
* node-fetch (GitHub communication)

---

## Future Improvements

* File-level explanations
* Architecture diagrams
* Multi-repository comparison
* Web interface for the agent

---

## License

MIT License
