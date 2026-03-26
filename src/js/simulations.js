import { ICO } from './icons.js';
import { BADGE_COLORS, bc, bcSolid, ALL_ITEMS } from './data.js';

export function buildAppSim() {
  return `<div class="sim">
    <div class="sim-titlebar"><div class="sim-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div><span style="flex:1;text-align:center;">New Session &middot; Downloads</span></div>
    <div class="sim-body">
      <div class="sim-sidebar">
        <div class="sim-btn">New Session</div>
        <div class="sim-section">Last 7 days</div>
        <div class="sim-menu-item" style="font-size:10px;color:var(--text-muted);padding:2px 10px;">1 session</div>
        <div class="sim-section">Customizations</div>
        <div class="sim-menu-item">${ICO.agents} Agents</div>
        <div class="sim-menu-item">${ICO.lightbulb} Skills <span class="sim-badge">2</span></div>
        <div class="sim-menu-item">${ICO.book} Instructions</div>
        <div class="sim-menu-item">${ICO.comment} Prompts <span class="sim-badge">6</span></div>
        <div class="sim-menu-item">${ICO.zap} Hooks</div>
        <div class="sim-menu-item">${ICO.server} MCP Servers <span class="sim-badge">1</span></div>
        <div class="sim-menu-item">${ICO.plug} Plugins</div>
        <div class="sim-footer">${ICO.file} avia (GitHub)</div>
      </div>
      <div class="sim-center">
        <div class="sim-exec"><div class="sim-toggle"><span class="on">Local</span><span>Cloud</span></div><span style="font-size:10px;color:var(--text-muted);">${ICO.folder} My project</span></div>
        <div class="sim-canvas"><svg viewBox="0 0 60 60" width="48" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="30,5 52,17 52,43 30,55 8,43 8,17"/><line x1="30" y1="5" x2="30" y2="55"/></svg></div>
        <div class="sim-prompt"><div class="sim-prompt-bar"><span>+</span> <span>${ICO.agents} Agent</span> <span>Claude Sonnet 4.6</span> <span class="send">${ICO.file}</span></div></div>
        <div class="sim-below"><span>${ICO.folder} Folder</span><span>Default Approvals</span></div>
      </div>
    </div>
  </div>`;
}

export function buildCustomizationSim(item) {
  const highlight = item?.id || "skills";
  const navItems = [
    { id: "agents", label: "Agents", ico: ICO.agents },
    { id: "skills", label: "Skills", ico: ICO.lightbulb, badge: "2" },
    { id: "instructions", label: "Instructions", ico: ICO.book },
    { id: "prompts", label: "Prompts", ico: ICO.comment, badge: "6" },
    { id: "hooks", label: "Hooks", ico: ICO.zap },
    { id: "mcp", label: "MCP Servers", ico: ICO.server, badge: "1" },
    { id: "plugins", label: "Plugins", ico: ICO.plug },
  ];
  const nav = navItems
    .map(
      (n) =>
        `<div class="sim-dlg-item${n.id === highlight ? " sel" : ""}">${n.ico} ${n.label}${n.badge ? `<span class="sim-dlg-badge">${n.badge}</span>` : ""}</div>`,
    )
    .join("");

  const typeLabel = item ? item.label || item.title : "Skill";
  return `<div class="sim" style="margin-bottom:16px;">
    <div class="sim-titlebar"><span style="font-weight:600;">Chat Customizations</span><span style="margin-left:auto;color:var(--text-muted);">&times;</span></div>
    <div class="sim-dialog">
      <div class="sim-dlg-nav">${nav}<div class="sim-dlg-footer">${ICO.folder} My project</div></div>
      <div class="sim-dlg-content">
        <div class="sim-new-btn">+ New ${typeLabel} (Workspace)</div>
        <div class="sim-search">Type to search...</div>
        <div class="sim-section-hdr"><strong>Built-In</strong></div>
        <div class="sim-dlg-file"><strong>Commit</strong></div>
        <div class="sim-dlg-file-desc">Commit staged or unstaged changes with an AI-generated commit message that matches the repository's existing commit styl...</div>
        <div class="sim-dlg-file"><strong>Update Skills</strong></div>
        <div class="sim-dlg-file-desc">Create or update repository skills and instructions when major learnings are discovered during a session.</div>
        <div style="flex:1;"></div>
        <div style="margin-top:12px;padding-top:8px;border-top:1px solid var(--border);font-size:9px;color:var(--text-muted);">Folders of instructions, scripts, and resources that Copilot loads when relevant. <a style="color:var(--accent);text-decoration:none;">Learn more</a></div>
      </div>
    </div>
  </div>`;
}

export function showScreenshot(canvas) {
  const C = [
    { cat: "sidebar", name: "Window Controls", tip: "Search, filter, close the app window" },
    { cat: "sidebar", name: "View Toggles", tip: "Toggle file panel, search, filter views" },
    { cat: "session", name: "Tab Bar", tip: "New Session / Downloads tabs" },
    { cat: "session", name: "New Session", tip: "Create a fresh agent session" },
    { cat: "session", name: "Session List", tip: "Archive, rename, fork, filter, export past sessions" },
    { cat: "config", name: "Customizations", tip: "Configuration section header grouping all options" },
    { cat: "config", name: "Agents", tip: "Define custom agent personas with instructions and permissions" },
    { cat: "config", name: "Skills", tip: "Reusable capability bundles attached to agents" },
    { cat: "config", name: "Instructions", tip: "Persistent global system-level instructions" },
    { cat: "config", name: "Prompts", tip: "Saved prompt templates for quick invocation" },
    { cat: "config", name: "Hooks", tip: "Event-driven triggers before/after agent actions" },
    { cat: "config", name: "MCP Servers", tip: "External tool integrations via Model Context Protocol" },
    { cat: "config", name: "Plugins", tip: "Installable agent+skill+prompt workflow bundles" },
    { cat: "sidebar", name: "Account", tip: "Authenticated GitHub identity gating Copilot features" },
    { cat: "exec", name: "Local / Cloud", tip: "Choose local (private) or cloud (GitHub PRs) execution" },
    { cat: "exec", name: "My project Picker", tip: "Select project folder for session scope" },
    { cat: "input", name: '"+&quot; Button', tip: "Add context or attachments to the prompt" },
    { cat: "input", name: "Agent Dropdown", tip: "Select which configured agent handles this session" },
    { cat: "input", name: "Model Selector", tip: "Choose AI model \u2014 Claude Sonnet 4.6, Copilot, Codex" },
    { cat: "input", name: "Send Button", tip: "Submit the prompt to the selected agent" },
    { cat: "input", name: "Folder Picker", tip: "Set the working directory / repository context" },
    { cat: "input", name: "Default Approvals", tip: "Control agent permissions: auto-execute vs confirm" },
  ];
  const legend = C.map(
    (c, i) =>
      `<tr><td style="white-space:nowrap;"><span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:${bcSolid(c.cat)};color:#fff;font-size:9px;font-weight:700;margin-right:6px;">${i + 1}</span><strong>${c.name}</strong></td><td>${c.tip}</td></tr>`,
  ).join("");
  canvas.innerHTML = `<div class="detail-view">
    <div class="dv-badge" style="${bc("session")}">Session</div>
    <div class="dv-title">App Layout Overview</div>
    <div class="dv-desc">An interactive simulation of the VS Code Sessions app. See all UI elements in the table below.</div>
    ${buildAppSim()}
    <div class="md-content" style="margin-top:20px;"><h3>All UI Elements</h3><table><thead><tr><th>Element</th><th>Description</th></tr></thead><tbody>${legend}</tbody></table></div></div>`;
  canvas.scrollTop = 0;
}

export function setupBadgeTips(root) {
  const tip = document.getElementById("tip");
  root.querySelectorAll(".ss-badge").forEach((b) => {
    b.addEventListener("mouseenter", () => {
      tip.querySelector("b").textContent = b.dataset.name || "";
      tip.querySelector("span").textContent = b.dataset.tip || "";
      const r = b.getBoundingClientRect();
      tip.style.left = r.right + 8 + "px";
      tip.style.top = r.top - 4 + "px";
      tip.classList.add("show");
      requestAnimationFrame(() => {
        const tr = tip.getBoundingClientRect();
        if (tr.right > window.innerWidth - 10)
          tip.style.left = r.left - tr.width - 8 + "px";
        if (tr.bottom > window.innerHeight - 10)
          tip.style.top = window.innerHeight - tr.height - 10 + "px";
      });
    });
    b.addEventListener("mouseleave", () => tip.classList.remove("show"));
  });
}
