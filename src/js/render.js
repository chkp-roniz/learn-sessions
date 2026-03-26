import { ICO } from './icons.js';
import { BADGE_COLORS, bc, MENU, ALL_ITEMS, getSelectedMenuId, setSelectedMenuId } from './data.js';
import { renderMD } from './markdown.js';
import { buildCustomizationSim, showScreenshot, setupBadgeTips } from './simulations.js';

export function renderMenu() {
  const c = document.getElementById("menu-items");
  MENU.forEach((m) => {
    const d = document.createElement("div");
    d.className = "menu-item";
    d.dataset.id = m.id;
    d.innerHTML = `<span class="mi-icon">${ICO[m.icon] || ""}</span><span>${m.label}</span>${m.badge ? `<span class="mi-badge">${m.badge}</span>` : ""}`;
    d.addEventListener("click", () => selectMenuItem(m.id));
    c.appendChild(d);
  });
}

export function selectMenuItem(id) {
  document
    .querySelectorAll(".menu-item")
    .forEach((el) =>
      el.classList.toggle("selected", el.dataset.id === id),
    );
  setSelectedMenuId(id);
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (item) showDetail(item);
}

export function renderRightPanel() {
  const tree = document.getElementById("rp-tree");
  const items = [
    { name: "My project", type: "root", indent: 0 },
    { name: ".github", type: "dir", indent: 1 },
    { name: "agents", type: "dir", indent: 2 },
    {
      name: "security-reviewer.md",
      type: "file",
      indent: 3,
      dot: "var(--badge-green)",
    },
    {
      name: "feature-builder.md",
      type: "file",
      indent: 3,
      dot: "var(--badge-green)",
    },
    { name: "skills", type: "dir", indent: 2 },
    { name: "commit.md", type: "file", indent: 3 },
    { name: "update-skills.md", type: "file", indent: 3 },
    {
      name: "write-tests.md",
      type: "file",
      indent: 3,
      dot: "var(--badge-green)",
    },
    { name: "instructions", type: "dir", indent: 2 },
    {
      name: "coding-standards.md",
      type: "file",
      indent: 3,
      dot: "var(--badge-green)",
    },
    { name: "prompts", type: "dir", indent: 2 },
    { name: "refactor-component.md", type: "file", indent: 3 },
    { name: "hooks", type: "dir", indent: 2 },
    { name: "pre-commit-lint.yaml", type: "file", indent: 3 },
    {
      name: "copilot-mcp.json",
      type: "file",
      indent: 2,
      dot: "var(--badge-rust)",
    },
    {
      name: "settings.json",
      type: "file",
      indent: 2,
      dot: "var(--badge-rust)",
    },
  ];
  items.forEach((it) => {
    const d = document.createElement("div");
    d.className = "rp-item" + (it.type === "root" ? " active" : "");
    d.style.paddingLeft = 8 + it.indent * 14 + "px";
    const icon =
      it.type === "dir" || it.type === "root" ? ICO.folder : ICO.file;
    d.innerHTML = `<span class="rp-icon-wrap">${icon}</span><span>${it.name}</span>${it.dot ? `<span class="rp-dot" style="background:${it.dot};"></span>` : ""}`;
    tree.appendChild(d);
  });
}

export function showWelcome() {
  setSelectedMenuId(null);
  document
    .querySelectorAll(".menu-item")
    .forEach((el) => el.classList.remove("selected"));
  const canvas = document.getElementById("canvas");
  const HIDDEN_CARDS = [
    "annotated",
    "approvals-default",
    "approvals-bypass",
    "approvals-autopilot",
  ];
  const cards = ALL_ITEMS.filter((i) => !HIDDEN_CARDS.includes(i.id))
    .map((item) => {
      const c = BADGE_COLORS[item.cat];
      return `<div class="feature-card" data-id="${item.id}"><div class="fc-badge" style="${bc(item.cat)}">${c?.label || ""}</div><div class="fc-title">${item.title}</div><div class="fc-desc">${item.desc.slice(0, 70)}${item.desc.length > 70 ? "..." : ""}</div></div>`;
    })
    .join("");
  canvas.innerHTML = `<div class="welcome-view">
    <div class="welcome-title">Explore VS Code Sessions</div>
    <div class="welcome-subtitle">Learn the standalone Sessions app by exploring its features.<br>Click a feature card below, or browse the sidebar menu items.</div>
    <div class="feature-grid">${cards}</div></div>`;
  canvas.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const mi = MENU.find((m) => m.id === id);
      if (mi) selectMenuItem(id);
      else {
        const it = ALL_ITEMS.find((i) => i.id === id);
        if (it) showDetail(it);
      }
    });
  });
  canvas.scrollTop = 0;
}

export function showDetail(item) {
  const canvas = document.getElementById("canvas");
  if (item.content === "__SCREENSHOT__") {
    showScreenshot(canvas);
    return;
  }
  const c = BADGE_COLORS[item.cat];
  const rendered = renderMD(item.content || "");
  const related = ALL_ITEMS.filter(
    (i) => i.cat === item.cat && i.id !== item.id && i.id !== "annotated",
  );
  let ssHTML = "";
  if (item.screenshot) {
    ssHTML =
      item.screenshotImg === "customization.png"
        ? buildCustomizationSim(item)
        : "";
  }
  canvas.innerHTML = `<div class="detail-view">
    ${c ? `<div class="dv-badge" style="${bc(item.cat)}">${c.label}</div>` : ""}
    <div class="dv-title">${item.title}</div><div class="dv-desc">${item.desc}</div>
    ${ssHTML}<div class="md-content">${rendered}</div>
    ${related.length ? `<div class="related-section"><h4>Related Features</h4>${related.map((r) => `<div class="related-link" data-id="${r.id}"><span class="rl-badge" style="${bc(r.cat)}">${BADGE_COLORS[r.cat]?.label || ""}</span>${r.title}</div>`).join("")}</div>` : ""}
  </div>`;
  canvas.querySelectorAll(".related-link").forEach((rl) => {
    rl.addEventListener("click", () => {
      const id = rl.dataset.id;
      const mi = MENU.find((m) => m.id === id);
      if (mi) selectMenuItem(id);
      else {
        const it = ALL_ITEMS.find((i) => i.id === id);
        if (it) showDetail(it);
      }
    });
  });
  setupBadgeTips(canvas);
  canvas.querySelectorAll(".cb-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const block = btn.closest(".code-block");
      const t = block?.querySelector(".cb-body")?.textContent || "";
      navigator.clipboard.writeText(t).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1500);
      });
    });
  });
  canvas.scrollTop = 0;
}
