# Learn Sessions

An interactive single-page explorer that teaches you everything about **VS Code Sessions** — the standalone experimental app from Microsoft that strips VS Code down to its agentic core.

## Why this exists

VS Code Sessions is a new, largely undocumented app. It first surfaced through a [February 2026 GitHub issue](https://github.com/microsoft/vscode-codicons/issues/436) requesting an app icon, and early sightings in VS Code Insiders builds. There is no official documentation, no public download page, and no tutorial — just scattered screenshots and community discussion.

This project fills that gap. Rather than writing a static doc, it recreates the Sessions UI as a fully interactive HTML simulation so you can explore every feature — Agents, Skills, Instructions, Prompts, Hooks, MCP Servers, Plugins — and understand how they fit together, without needing access to the app itself.

## What's inside

- **`index.html`** — the entire explorer in a single self-contained HTML file (no build step, no dependencies). Open it in any browser.
- **`.docs/`** — reference screenshots and research notes used during development.

## Quick start

```
open index.html
```

Or just double-click the file. That's it.