export const BADGE_COLORS = {
  sidebar: { label: "Sidebar", bg: "var(--badge-teal)" },
  config: { label: "Config", bg: "var(--badge-gold)" },
  exec: { label: "Execution", bg: "var(--badge-green)" },
  input: { label: "Input", bg: "var(--badge-purple)" },
  modal: { label: "Modal", bg: "var(--badge-rust)" },
  files: { label: "Files", bg: "var(--badge-blue)" },
  session: { label: "Session", bg: "var(--accent)" },
};

export function bc(cat) {
  const c = BADGE_COLORS[cat];
  return c ? `background:${c.bg}18;color:${c.bg};` : ``;
}

export function bcSolid(cat) {
  const c = BADGE_COLORS[cat];
  return c ? c.bg : "var(--accent)";
}

export const MENU = [
  {
    id: "agents",
    icon: "agents",
    label: "Agents",
    badge: null,
    cat: "config",
    title: "Agents",
    desc: "Define custom AI agent personas with specific instructions, model choices (Claude, Copilot, Codex), and tool permissions.",
    content: `## What Are Agents?\n\nAgents are custom AI personas you configure in the Sessions app. Each agent has:\n\n- **Model** \u2014 Which AI model powers it (Claude Sonnet 4.6, Copilot, Codex)\n- **Instructions** \u2014 System prompt defining behavior and expertise\n- **Permissions** \u2014 What tools and filesystem access the agent has\n- **Skills** \u2014 Which skill bundles are attached\n\n## The Chat Customizations Dialog\n\nClicking **Agents** opens the **Chat Customizations** dialog. The center area shows a **search bar**, collapsible sections for **Built-In** and **Custom** agents, and a coral **"+ New Agent (Workspace)"** button with a dropdown for **"New Agent (User)"**.\n\n## Example Configurations\n\n| Agent | Model | Access | Purpose |\n|-------|-------|--------|---------|\n| Security Reviewer | Claude Sonnet 4.6 | Read-only | Audit code for OWASP vulnerabilities |\n| Feature Builder | Copilot | Full access | Implement features with tests |\n| Docs Writer | Claude Opus 4.6 | Read + write docs/ | Generate documentation |\n\n## Workspace vs User Scope\n\n- **Workspace** \u2014 Stored in \`.github/agents/\`, committed to the repo, shared with team\n- **User** \u2014 Personal, stays local, not version controlled\n\n## Multi-Agent Orchestration\n\nRun multiple agents in parallel across sessions. A Plan agent can break tasks into subtasks and delegate each to a specialized execution agent.`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      { x: 6, y: 7.5, tip: "Agents section in Chat Customizations" },
    ],
  },
  {
    id: "skills",
    icon: "lightbulb",
    label: "Skills",
    badge: "2",
    cat: "config",
    title: "Skills",
    desc: "Reusable capability bundles attached to agents. Examples: 'write tests', 'documentation', 'security review'.",
    content: `## What Are Skills?\n\nSkills are reusable instruction bundles that give agents specific capabilities.\n\n## The Chat Customizations Dialog \u2014 Skills View\n\nThe screenshot shows the actual UI:\n\n- **Left nav**: Agents, **Skills** (selected, badge **2**), Instructions, Prompts (6), Hooks, MCP Servers (1), Plugins\n- **Search bar**: "Type to search..." at the top\n- **"+ New Skill (Workspace)"** button (coral) with dropdown for **"New Skill (User)"**\n- **Built-In** section showing:\n  - **Commit** \u2014 AI-generated commit messages matching repo style\n  - **Update Skills** \u2014 Auto-saves learnings from sessions\n- **Bottom**: Description + coral "Learn more about agent skills" link\n\n## Skill File Structure\n\n\`\`\`yaml\nname: "write-tests"\ndescription: "Generate tests matching project conventions"\n\`\`\`\n\n\`\`\`markdown\n# Skill: Write Tests\n\n## Overview\nAnalyze the target code and generate comprehensive test suites.\n\n## Best Practices\n- Match the existing test framework (Jest, Vitest, pytest)\n- Cover happy path, edge cases, and error scenarios\n- Use descriptive test names\n\`\`\`\n\n## Workspace vs User\n\n- **Workspace** \u2014 Stored in \`.github/skills/\`, shared with team\n- **User** \u2014 Personal, local only`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      {
        x: 6,
        y: 10.5,
        tip: "Skills (selected) \u2014 badge shows count",
      },
      { x: 88, y: 8, tip: '"+ New Skill (Workspace)" button' },
      { x: 15, y: 17, tip: "Built-In: Commit and Update Skills" },
    ],
  },
  {
    id: "instructions",
    icon: "book",
    label: "Instructions",
    badge: null,
    cat: "config",
    title: "Instructions",
    desc: "Persistent system-level instructions injected into every session \u2014 your global system prompt.",
    content: `## Global Instructions\n\nInstructions are system-level prompts applied to **every session**, regardless of which agent is active.\n\n## The Chat Customizations Dialog\n\nClicking **Instructions** opens the same dialog. Create with **"+ New Instruction (Workspace)"** or **"New Instruction (User)"**. Stored in \`.github/instructions/\`.\n\n## Instruction File Structure\n\n\`\`\`yaml\nname: "coding-standards"\ndescription: "Enforce team coding conventions across all sessions"\n\`\`\`\n\n\`\`\`markdown\n# Instruction: Coding Standards\n\n## Overview\nRules that every agent must follow regardless of persona.\n\n## Standards\n- Always follow the project's existing code style\n- Use TypeScript strict mode\n- Prefer functional components over class components\n- Write JSDoc comments for all exported functions\n- Never commit directly to main\n\`\`\`\n\n## Instructions vs Agent Instructions\n\n| | Global Instructions | Agent Instructions |\n|---|---|---|\n| Scope | All sessions, all agents | One specific agent |\n| Purpose | Team coding standards | Agent persona/expertise |`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      { x: 6, y: 13, tip: "Instructions in Chat Customizations" },
    ],
  },
  {
    id: "prompts",
    icon: "comment",
    label: "Prompts",
    badge: "6",
    cat: "config",
    title: "Prompts",
    desc: "Saved prompt templates for quick invocation. Badge count shows configured templates.",
    content: `## Saved Prompts\n\nPrompts are reusable templates you invoke with one click.\n\n## Prompt File Structure\n\n\`\`\`yaml\nname: "refactor-component"\ndescription: "Structured component refactoring workflow"\n\`\`\`\n\n\`\`\`markdown\n# Prompt: Refactor Component\n\n## Template\nRefactor the {{component}} component:\n1. Extract shared logic into custom hooks\n2. Split into smaller sub-components\n3. Add TypeScript types for all props\n4. Ensure all existing tests still pass\n5. Update imports across the codebase\n\n## Usage Notes\nFill in {{variables}} before sending.\n\`\`\`\n\n## Workspace vs User\n\n- **Workspace** \u2014 Stored in \`.github/prompts/\`, shared\n- **User** \u2014 Personal, local only\n\n## Use Cases\n\n- Structured refactoring workflows\n- Bug investigation checklists\n- Code review request templates`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      { x: 6, y: 16, tip: "Prompts (6) \u2014 badge shows count" },
    ],
  },
  {
    id: "hooks",
    icon: "zap",
    label: "Hooks",
    badge: null,
    cat: "config",
    title: "Hooks",
    desc: "Event-driven automation triggers that fire before or after specific agent actions.",
    content: `## What Are Hooks?\n\nHooks intercept agent actions. They fire **before** or **after** specific events.\n\n## Hook File Structure\n\n\`\`\`yaml\nname: "pre-commit-lint"\ndescription: "Run linter before every agent commit"\n\`\`\`\n\n\`\`\`yaml\n# Hook: Pre-Commit Lint\nevent: before-commit\ncommand: npm run lint -- --fix\non-failure: block-and-report\n\`\`\`\n\n## Available Events\n\n| Event | When It Fires |\n|-------|---------------|\n| before-file-write | Before agent writes a file |\n| after-file-write | After agent writes a file |\n| before-commit | Before agent makes a git commit |\n| before-tool-call | Before agent invokes an MCP tool |\n| session-end | When a session is archived or closed |\n\n## Use Cases\n\n- Auto-format code after writes\n- Run tests before commits\n- Log all tool calls for auditing\n- Notify Slack when sessions complete`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [{ x: 6, y: 19.5, tip: "Hooks in Chat Customizations" }],
  },
  {
    id: "mcp",
    icon: "server",
    label: "MCP Servers",
    badge: "1",
    cat: "config",
    title: "MCP Servers",
    desc: "External tool integrations via Model Context Protocol. Connect agents to Atlassian, databases, APIs.",
    content: `## Model Context Protocol\n\nMCP servers expose external tools that agents can call during sessions.\n\n## Configuration File Structure\n\n\`\`\`json\n{\n  "servers": [\n    {\n      "name": "atlassian",\n      "transport": "stdio",\n      "command": "npx",\n      "args": ["-y", "@anthropic/mcp-atlassian"],\n      "env": {\n        "JIRA_URL": "https://your-org.atlassian.net"\n      }\n    }\n  ]\n}\n\`\`\`\n\n## Common Integrations\n\n| Server | What It Provides |\n|--------|------------------|\n| Atlassian | Jira tickets, Confluence pages |\n| PostgreSQL | Database queries |\n| GitHub | Extended GitHub operations |\n| Slack | Channel messages, notifications |\n| Custom APIs | Any REST/GraphQL endpoint |\n\n## Best Practices\n\n- Store credentials in environment variables, never in the config file\n- Use \`stdio\` transport for local servers, \`http\` for remote\n- Test server connectivity before attaching to production sessions`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      { x: 6, y: 22.5, tip: "MCP Servers (1) \u2014 badge shows count" },
    ],
  },
  {
    id: "plugins",
    icon: "plug",
    label: "Plugins",
    badge: null,
    cat: "config",
    title: "Plugins",
    desc: "Installable workflow bundles combining agents + skills + prompts for specific job functions.",
    content: `## What Are Plugins?\n\nPlugins are pre-packaged bundles that combine multiple components into one installable package.\n\n## A Plugin Contains\n\n- **Agent persona** \u2014 Specialized for the domain\n- **Skills** \u2014 Domain-specific capabilities\n- **Prompts** \u2014 Pre-built templates\n- **MCP connectors** \u2014 Required external tools\n\n## Available Plugins\n\n| Plugin | For |\n|--------|-----|\n| Financial Analysis | Finance teams \u2014 FactSet, Bloomberg |\n| Legal Contract Review | Legal departments |\n| HR Support | Human resources workflows |\n| Sales Workflows | CRM, outreach, pipeline |\n\n## Installation Sources\n\n- **Public marketplace** \u2014 Community plugins\n- **Enterprise marketplace** \u2014 Admin-provisioned, per-user\n- **Local files** \u2014 Custom internal plugins`,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [{ x: 6, y: 25.5, tip: "Plugins in Chat Customizations" }],
  },
];

export const EXTRA_FEATURES = [
  {
    id: "overview",
    cat: "session",
    title: "App Overview",
    desc: "The standalone VS Code Sessions app \u2014 a lightweight agent-focused editor, purpose-built for agent workflows.",
    content: `## What Is VS Code Sessions?\n\n| | Agent Sessions (feature) | Sessions (standalone app) |\n|---|---|---|\n| What | Feature inside VS Code since v1.107 | Separate experimental application |\n| Released | November 2025 (GA) | Experimental / unreleased |\n| UI | Sidebar panel in full VS Code | Purpose-built minimal interface |\n\n## Why a Standalone App?\n\nThe standalone app strips away the file explorer, editor tabs, and extensions sidebar \u2014 leaving only:\n\n- Session management (create, archive, fork, export)\n- Agent configuration (the CUSTOMIZATIONS sidebar)\n- Prompt input + model selection\n- Execution mode toggle (Local / Cloud)\n- Filesystem scope control\n\n## Key Architecture\n\n- **Multi-agent orchestration** \u2014 Run Copilot, Claude, and Codex from one place\n- **Session handoff** \u2014 Local \u2192 background \u2192 cloud with preserved context\n- **Isolated worktrees** \u2014 Each session gets its own Git worktree\n\n## The Three Panels\n\n| Panel | Purpose |\n|-------|---------|\n| Left sidebar | Session list + CUSTOMIZATIONS config |\n| Center | Chat canvas + prompt bar + exec mode |\n| Right | Filesystem tree (local) or repo tree (cloud) |`,
  },
  {
    id: "installation",
    cat: "session",
    title: "Installation",
    desc: "How to get the standalone VS Code Sessions app running on your machine.",
    content: `## Prerequisites\n\n- **VS Code Insiders** \u2014 The Sessions app is currently only available through VS Code Insiders builds\n- **GitHub Copilot subscription** \u2014 Free tier works for basic features; Pro or Pro+ recommended for multi-agent access\n- **GitHub account** \u2014 Required for authentication and cloud agent features\n\n## Step 1: Install VS Code Insiders\n\nDownload from the official VS Code Insiders page. The Sessions app ships as part of the Insiders build.\n\n\`\`\`bash\n# macOS (Homebrew)\nbrew install --cask visual-studio-code-insiders\n\`\`\`\n\n\`\`\`bash\n# Windows (winget)\nwinget install Microsoft.VisualStudioCode.Insiders\n\`\`\`\n\n\`\`\`bash\n# Linux (snap)\nsudo snap install code-insiders --classic\n\`\`\`\n\n## Step 2: Enable Agent Sessions\n\nOpen VS Code Insiders and enable the feature:\n\n1. Open **Settings** (Ctrl/Cmd + ,)\n2. Search for \`chat.agent.enabled\`\n3. Set to **true**\n4. Search for \`github.copilot.chat.sessions.enabled\`\n5. Set to **true**\n\n## Step 3: Sign in to GitHub\n\nClick the **Accounts** icon in the bottom-left corner and sign in with your GitHub account that has an active Copilot subscription.\n\n## Step 4: Open Sessions\n\nOpen the **Command Palette** (Ctrl/Cmd + Shift + P) and run:\n\n\`\`\`\nSessions: New Session\n\`\`\`\n\n## Verifying Your Setup\n\n| Check | Expected |\n|-------|----------|\n| VS Code version | Insiders (1.107+) |\n| Copilot extension | Installed and signed in |\n| Sessions sidebar | Visible in Chat panel |\n| Agent dropdown | Shows available models |`,
  },
  {
    id: "local-cloud",
    cat: "exec",
    title: "Local / Cloud Execution",
    desc: "Local: private, fast, isolated Git worktrees. Cloud: GitHub infrastructure, autonomous PRs.",
    content: `## Execution Modes\n\n## Local Mode\n\n| Property | Value |\n|----------|-------|\n| Runs on | Your machine |\n| Filesystem | Local disk + Git worktrees |\n| Privacy | Fully private |\n| Latency | Minimal |\n\n## Cloud Mode\n\n| Property | Value |\n|----------|-------|\n| Runs on | GitHub infrastructure |\n| Output | Pull requests, issues, comments |\n| Access | GitHub.com, Mobile, CLI, VS Code |\n\n## Session Handoff\n\n1. Brainstorm interactively with a local agent\n2. Refine the plan\n3. Hand off to a cloud agent for autonomous execution\n4. Full conversation context preserved at each transition`,
  },
  {
    id: "add-action",
    cat: "modal",
    title: "Add Action Modal",
    desc: "Configure named shell tasks tied to the session worktree lifecycle.",
    content: `## Actions \u2014 Shell Tasks\n\n## Modal Fields\n\n| Field | Purpose |\n|-------|---------|\n| Name | Optional human-readable label |\n| Command | Any shell command: \`npm run dev\`, \`make build\` |\n| Auto-run | Run automatically when worktree is created |\n| Save In | Workspace (shared) or User (personal) |\n\n## Scope\n\n- **Workspace** \u2014 Committed to the repo, shared with team\n- **User** \u2014 Stays local, personal preference`,
  },
  {
    id: "prompt-bar",
    cat: "input",
    title: "Prompt Input Bar",
    desc: "Agent selector, model selector (Claude Sonnet 4.6, Copilot, Codex), folder picker, approval controls.",
    content: `## Prompt Input Bar\n\n## Components\n\n| Element | Purpose |\n|---------|---------|\n| + Button | Add context, files, or attachments |\n| Agent dropdown | Select which agent handles this session |\n| Model selector | Choose AI model |\n| Send button | Submit prompt to the agent |\n| Folder picker | Set working directory |\n| Default Approvals | Control agent permission level |\n\n## Default Approvals\n\n| Action | Options |\n|--------|---------|\n| File reads | Usually auto-approved |\n| File writes | Configurable |\n| Terminal commands | Configurable |\n| Git operations | Recommended: ask first |`,
  },
  {
    id: "approvals-default",
    cat: "input",
    title: "Default Approvals",
    desc: "Copilot uses your configured settings \u2014 file reads auto-approved, writes and commands require confirmation.",
    content: `## Default Approvals\n\nThe standard approval mode. Copilot follows your configured permission settings.\n\n## What Gets Approved Automatically\n\n| Action | Behavior |\n|--------|----------|\n| File reads | Auto-approved |\n| File writes | Requires confirmation |\n| Terminal commands | Requires confirmation |\n| Git operations | Requires confirmation |\n| MCP tool calls | Requires confirmation |\n\n## Configuration\n\nYou can customize which actions require approval in your workspace or user settings. The defaults are conservative \u2014 only read operations are auto-approved.\n\n## When to Use\n\nThis is the recommended mode for day-to-day development. You stay in the loop for any operation that modifies files, runs commands, or interacts with external tools.`,
  },
  {
    id: "approvals-bypass",
    cat: "input",
    title: "Bypass Approvals",
    desc: "All tool calls are auto-approved \u2014 the agent can read, write, and execute without asking.",
    content: `## Bypass Approvals\n\nAll agent actions are auto-approved. No confirmation dialogs.\n\n## What Changes\n\n| Action | Behavior |\n|--------|----------|\n| File reads | Auto-approved |\n| File writes | Auto-approved |\n| Terminal commands | Auto-approved |\n| Git operations | Auto-approved |\n| MCP tool calls | Auto-approved |\n\n## When to Use\n\n- Trusted, well-scoped tasks in **isolated worktrees**\n- Repetitive operations where confirmation adds friction without safety\n- Tasks where the agent's plan has already been reviewed\n\n## Safety Considerations\n\n- Never use on your main branch\n- Always use with isolated Git worktrees so changes can be reviewed before merging\n- The agent can execute any shell command without asking \u2014 ensure your environment is sandboxed`,
  },
  {
    id: "approvals-autopilot",
    cat: "input",
    title: "Autopilot (Preview)",
    desc: "Autonomously iterates from start to finish \u2014 plans, executes, and self-corrects without human checkpoints.",
    content: `## Autopilot (Preview)\n\nThe most autonomous mode. The agent plans, executes, tests, and self-corrects in a continuous loop until the task is complete.\n\n## How It Differs from Bypass\n\n| | Bypass | Autopilot |\n|---|---|---|\n| Approvals | Skipped | Skipped |\n| Iteration | Waits for your next prompt | Continues autonomously |\n| Self-correction | No | Yes \u2014 retries on failure |\n| Completion | Stops after one response | Runs until task is done |\n\n## When to Use\n\n- Well-defined tasks with clear success criteria\n- Best combined with a **Plan agent** that breaks the task into steps first\n- Multi-file refactors, test generation, documentation sweeps\n\n## Limitations\n\n- Marked **Preview** \u2014 expect rough edges and occasional loops\n- Should only be used in isolated worktrees\n- No human checkpoints means errors compound \u2014 review the diff carefully after completion\n- Long-running tasks may consume significant API quota`,
  },
  {
    id: "session-mgmt",
    cat: "session",
    title: "Session Management",
    desc: "Create, archive, rename, fork, filter, and export sessions.",
    content: `## Managing Sessions\n\n| Operation | What it does |\n|-----------|--------------|\n| New Session | Fresh session with own context |\n| Archive | Save for later reference |\n| Rename | Descriptive name |\n| Fork | Branch the conversation |\n| Filter | Search through past sessions |\n| Export | Download as JSON |\n| Handoff | Transfer to background/cloud agent |\n\n## Session Handoff\n\nLocal (interactive) \u2192 Background (CLI agent) \u2192 Cloud (GitHub PR)`,
  },
  {
    id: "chat-customizations",
    cat: "config",
    title: "Chat Customizations Dialog",
    desc: "The full-screen configuration dialog with left nav, search, Built-In/Custom sections, Workspace/User scope.",
    content: `## Chat Customizations Dialog\n\nClicking any item under **Customizations** opens this dialog.\n\n## Dialog Layout\n\n| Area | Contents |\n|------|---------|\n| Title bar | "Chat Customizations" + expand/close icons |\n| Left navigation | Agents, Skills (2), Instructions, Prompts (6), Hooks, MCP Servers (1), Plugins |\n| Top-right | Coral "+" button with dropdown |\n| Center | Search bar + collapsible sections |\n| Bottom | Description + coral "Learn more" link |\n\n## Workspace vs User Scope\n\n- **Workspace** \u2014 Stored in \`.github/\`, committed, shared\n- **User** \u2014 Personal, local only\n\n## File Storage in .github/\n\n\`\`\`\n.github/\n  agents/\n    security-reviewer.md\n    feature-builder.md\n  skills/\n    commit.md\n    update-skills.md\n  instructions/\n    coding-standards.md\n  prompts/\n    refactor-component.md\n  hooks/\n    pre-commit-lint.yaml\n  copilot-mcp.json\n  settings.json\n\`\`\``,
    screenshot: true,
    screenshotImg: "customization.png",
    callouts: [
      { x: 6, y: 3, tip: "Chat Customizations title" },
      { x: 6, y: 10.5, tip: "Left nav \u2014 Skills selected" },
      { x: 50, y: 8, tip: "Search bar" },
      { x: 88, y: 8, tip: '"+ New" button with scope dropdown' },
      { x: 20, y: 17, tip: "Commit \u2014 built-in skill" },
      { x: 20, y: 23, tip: "Update Skills \u2014 built-in skill" },
      { x: 50, y: 97, tip: '"Learn more" link' },
      { x: 6, y: 98, tip: "My project folder" },
    ],
  },
  {
    id: "annotated",
    cat: "session",
    title: "Annotated Screenshot",
    desc: "Interactive annotated screenshot with numbered badges.",
    content: "__SCREENSHOT__",
  },
];

export const ALL_ITEMS = [...EXTRA_FEATURES, ...MENU];

let _selectedMenuId = null;
export function getSelectedMenuId() { return _selectedMenuId; }
export function setSelectedMenuId(id) { _selectedMenuId = id; }
