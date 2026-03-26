export function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fmt(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function renderMD(raw) {
  const lines = raw.split("\n");
  let html = "",
    inCode = false,
    codeLines = [],
    codeLang = "",
    inTable = false,
    tableRows = [];
  function flushTable() {
    if (!tableRows.length) return "";
    const h = tableRows[0],
      b = tableRows.slice(2);
    let t =
      "<table><thead><tr>" +
      h
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("") +
      "</tr></thead><tbody>" +
      b
        .map(
          (r) =>
            "<tr>" +
            r
              .split("|")
              .filter((c) => c.trim())
              .map((c) => `<td>${c.trim()}</td>`)
              .join("") +
            "</tr>",
        )
        .join("") +
      "</tbody></table>";
    tableRows = [];
    return t;
  }
  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html += `<div class="code-block"><div class="cb-header"><span>${codeLang || "text"}</span><span class="cb-copy">Copy</span></div><div class="cb-body">${esc(codeLines.join("\n"))}</div></div>`;
        inCode = false;
        codeLines = [];
        codeLang = "";
      } else {
        if (inTable) {
          html += flushTable();
          inTable = false;
        }
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (line.includes("|") && line.trim().startsWith("|")) {
      if (!inTable) inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      html += flushTable();
      inTable = false;
    }
    if (line.startsWith("## ")) html += `<h2>${line.slice(3)}</h2>`;
    else if (line.startsWith("### ")) html += `<h3>${line.slice(4)}</h3>`;
    else if (line.startsWith("- "))
      html += `<ul><li>${fmt(line.slice(2))}</li></ul>`;
    else if (line.trim() === "")
      html += '<div style="height:6px;"></div>';
    else html += `<p>${fmt(line)}</p>`;
  }
  if (inTable) html += flushTable();
  return html;
}
