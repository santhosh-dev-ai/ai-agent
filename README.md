# AI Codebase Explainer Agent

An autonomous AI agent that analyzes GitHub repositories, explains project structure, detects potential bugs, and answers developer questions about the codebase.

This project implements the **gitagent architecture**, where the AI agent is defined through configuration files and modular skills.

---

## Features

- Analyze GitHub repositories
- Explain project architecture
- Detect potential bugs
- Suggest improvements
- Answer developer questions about the codebase
- Modular skill-based AI agent design

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
- Defines the agent configuration and capabilities.

**SOUL.md**
- Defines the identity and personality of the AI agent.

**RULES.md**
- Defines the behavioral constraints and safety rules.

**SKILL.md**
- Defines the capabilities of the agent.

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
2. The AI agent analyzes the repository.
3. The agent generates insights such as:
   - project overview
   - architecture explanation
   - bug detection
   - improvement suggestions

The AI reasoning is powered by **Groq LLM (LLaMA 3.1)**.

---

## Installation

Install dependencies:

```
npm install
```

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

---

## Example Workflow

```
node index.js

Enter GitHub Repo URL:
https://github.com/facebook/react

Ask something:
analyze
```

The agent will generate a structured explanation of the repository.

---

## Tech Stack

- Node.js
- JavaScript
- Groq LLM (LLaMA 3.1)
- Gitagent architecture

---

## Future Improvements

- File-level explanations
- Architecture diagrams
- Multi-repository comparison
- Web interface for the agent

---

## License

MIT License