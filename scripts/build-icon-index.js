#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

const OUTPUT = '/home/coder/icon-index.md';

const CODICON_RAW = 'https://raw.githubusercontent.com/microsoft/vscode-codicons/main/src/icons';
const CODICON_BROWSE = 'https://github.com/microsoft/vscode-codicons/blob/main/src/icons';
const VSCODE_LIGHT_RAW = 'https://raw.githubusercontent.com/microsoft/vscode-icons/main/icons/light';
const VSCODE_DARK_RAW = 'https://raw.githubusercontent.com/microsoft/vscode-icons/main/icons/dark';
const FLUENT_RAW = 'https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets';

function ghApi(endpoint) {
  try {
    const out = execSync(`gh api "${endpoint}"`, { maxBuffer: 10 * 1024 * 1024 }).toString();
    return JSON.parse(out);
  } catch (e) {
    console.error(`Failed: gh api "${endpoint}"`);
    throw e;
  }
}

console.log('Fetching VS Code Codicons list...');
const codiconTree = ghApi('repos/microsoft/vscode-codicons/git/trees/main?recursive=1');
const codiconFiles = codiconTree.tree
  .filter(f => f.path.startsWith('src/icons/') && f.path.endsWith('.svg'))
  .map(f => f.path.replace('src/icons/', ''))
  .sort();
console.log(`  → ${codiconFiles.length} codicons`);

console.log('Fetching VS Code Icons list...');
const vscodeTree = ghApi('repos/microsoft/vscode-icons/git/trees/main?recursive=1');
const vscodeIconFiles = vscodeTree.tree
  .filter(f => f.path.startsWith('icons/light/') && f.path.endsWith('.svg'))
  .map(f => f.path.replace('icons/light/', ''))
  .sort();
console.log(`  → ${vscodeIconFiles.length} vscode-icons (light/dark pairs)`);

// ── Build markdown ──────────────────────────────────────────────────────────

const lines = [];

lines.push('# Microsoft Icon Index');
lines.push('');
lines.push('> **Auto-generated** by `scripts/build-icon-index.js` in `learn-sessions`.');
lines.push('> Run `node scripts/build-icon-index.js` from the project root to refresh.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Quick Reference');
lines.push('');
lines.push('| Set | Icons | Style | Theme |');
lines.push('|-----|-------|-------|-------|');
lines.push(`| [VS Code Codicons](https://github.com/microsoft/vscode-codicons) | ${codiconFiles.length} | 16×16 filled, \`fill="currentColor"\` | Auto (inherits CSS color) |`);
lines.push(`| [VS Code Icons](https://github.com/microsoft/vscode-icons) | ${vscodeIconFiles.length} pairs | Variable size | Separate light/dark SVG files |`);
lines.push('| [Fluent UI Regular](https://github.com/microsoft/fluentui-system-icons/blob/main/icons_regular.md) | 1000s | Multi-size | See URL pattern below |');
lines.push('| [Fluent UI Filled](https://github.com/microsoft/fluentui-system-icons/blob/main/icons_filled.md) | 1000s | Multi-size | See URL pattern below |');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## URL Patterns');
lines.push('');
lines.push('```');
lines.push(`# VS Code Codicons`);
lines.push(`${CODICON_RAW}/{name}.svg`);
lines.push('');
lines.push('# VS Code Icons (light/dark)');
lines.push(`${VSCODE_LIGHT_RAW}/{name}.svg`);
lines.push(`${VSCODE_DARK_RAW}/{name}.svg`);
lines.push('');
lines.push('# Fluent UI System Icons');
lines.push(`${FLUENT_RAW}/{Icon Name}/SVGs/ic_fluent_{icon_name}_{size}_{style}.svg`);
lines.push('# sizes: 10 12 16 20 24 28 32 48   styles: regular filled');
lines.push('# example:');
lines.push(`${FLUENT_RAW}/Add/SVGs/ic_fluent_add_24_regular.svg`);
lines.push('```');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## How to Use in learn-sessions');
lines.push('');
lines.push('This is a **VS Code-themed** site — use **Codicons** for all UI icons.');
lines.push('');
lines.push('```bash');
lines.push('# 1. Find the icon name in the Codicons table below');
lines.push('# 2. Fetch the SVG:');
lines.push("gh api repos/microsoft/vscode-codicons/contents/src/icons/{name}.svg --jq '.content' | base64 -d");
lines.push('# 3. Strip width, height, xmlns from the <svg> tag');
lines.push('# 4. Add class="ico" (16px) or class="ico-sm" (14px)');
lines.push('# 5. Add to src/js/icons.js as a new key in the ICO export object');
lines.push('```');
lines.push('');
lines.push('**Light/dark mode:** Codicons use `fill="currentColor"` — they automatically inherit');
lines.push('the CSS `color` value. No separate light/dark variants needed.');
lines.push('');
lines.push('**VS Code Icons** (light/dark pairs): Use CSS to swap sources:');
lines.push('```css');
lines.push('.icon-src { content: url("/icons/light/name.svg"); }');
lines.push('[data-theme="dark"] .icon-src { content: url("/icons/dark/name.svg"); }');
lines.push('```');
lines.push('');
lines.push('---');
lines.push('');

// ── VS Code Codicons table ──────────────────────────────────────────────────

lines.push(`## VS Code Codicons (${codiconFiles.length})`);
lines.push('');
lines.push('Browse all: <https://microsoft.github.io/vscode-codicons/dist/codicon.html>');
lines.push('');
lines.push('| Name | File | Raw URL |');
lines.push('|------|------|---------|');
codiconFiles.forEach(f => {
  const name = f.replace('.svg', '');
  lines.push(`| ${name} | \`${f}\` | [↗](${CODICON_RAW}/${f}) |`);
});
lines.push('');

// ── VS Code Icons table ─────────────────────────────────────────────────────

lines.push('---');
lines.push('');
lines.push(`## VS Code Icons — Light/Dark (${vscodeIconFiles.length} pairs)`);
lines.push('');
lines.push('| Name | Light | Dark |');
lines.push('|------|-------|------|');
vscodeIconFiles.forEach(f => {
  const name = f.replace('.svg', '');
  lines.push(`| ${name} | [light ↗](${VSCODE_LIGHT_RAW}/${f}) | [dark ↗](${VSCODE_DARK_RAW}/${f}) |`);
});
lines.push('');

// ── Fluent UI reference ─────────────────────────────────────────────────────

lines.push('---');
lines.push('');
lines.push('## Fluent UI System Icons');
lines.push('');
lines.push('Fluent UI contains thousands of icons across multiple sizes and styles.');
lines.push('The full name lists are maintained upstream:');
lines.push('');
lines.push('- **Regular:** <https://github.com/microsoft/fluentui-system-icons/blob/main/icons_regular.md>');
lines.push('- **Filled:** <https://github.com/microsoft/fluentui-system-icons/blob/main/icons_filled.md>');
lines.push('');
lines.push('**SVG URL pattern:**');
lines.push('```');
lines.push(`${FLUENT_RAW}/{Icon Name}/SVGs/ic_fluent_{icon_name}_{size}_{style}.svg`);
lines.push('```');
lines.push('');
lines.push('Where:');
lines.push('- `{Icon Name}` = PascalCase folder name, e.g. `Add`, `Arrow Circle Down`, `Accessibility`');
lines.push('- `{icon_name}` = snake_case version, e.g. `add`, `arrow_circle_down`, `accessibility`');
lines.push('- `{size}` = `10` | `12` | `16` | `20` | `24` | `28` | `32` | `48`');
lines.push('- `{style}` = `regular` | `filled`');
lines.push('');
lines.push('**Example:**');
lines.push('```');
lines.push(`${FLUENT_RAW}/Agent/SVGs/ic_fluent_agent_24_regular.svg`);
lines.push(`${FLUENT_RAW}/Add/SVGs/ic_fluent_add_16_filled.svg`);
lines.push(`${FLUENT_RAW}/Lightbulb/SVGs/ic_fluent_lightbulb_20_regular.svg`);
lines.push('```');
lines.push('');
lines.push('> **Note:** Fluent UI icons are NOT used in learn-sessions.');
lines.push('> The site uses VS Code Codicons to match the VS Code aesthetic.');
lines.push('');

const content = lines.join('\n');
fs.writeFileSync(OUTPUT, content, 'utf8');
console.log(`\nWritten: ${OUTPUT}`);
console.log(`  ${lines.length} lines, ${(content.length / 1024).toFixed(1)} KB`);
