(() => {
  "use strict";

  const lineBreakMarker = "\uE000";
  const separatorRow = cells => cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/.test(cell.replace(/\s/g, "")));

  function formatInline(value) {
    return value
      .replace(/^\s{0,3}#{1,6}\s+/, "")
      .replace(/^\s*[-*_]{3,}\s*$/, "")
      .replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_, bold, underlined) => bold || underlined)
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)")
      .replace(/<\/(?:p|div|li|ul|ol)\s*>/gi, "\n")
      .replace(/<(?:p|div|ul|ol)\b[^>]*>/gi, "")
      .replace(/<li\b[^>]*>/gi, "- ")
      .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, "\"")
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&amp;/gi, "&");
  }

  function parseTableRow(line) {
    return line.trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map(cell => cell.trim());
  }

  function formatTable(lines) {
    const rows = lines.map(parseTableRow);
    const dividerIndex = rows.findIndex(separatorRow);
    if (dividerIndex !== 1 || rows.length < 3) return null;

    return rows.slice(2).map(row => {
      if (row.length === 2) {
        return `- ${formatInline(row[0])}: ${formatInline(row[1])}`;
      }
      return row
        .map((cell, index) => `${formatInline(rows[0][index] || `Item ${index + 1}`)}: ${formatInline(cell)}`)
        .join("\n  ")
        .replace(/^/, "- ");
    }).join("\n");
  }

  function toReadableText(value) {
    const normalized = String(value || "")
      .normalize("NFKC")
      .replace(/\r\n?/g, "\n")
      .replace(/<br\s*\/?>/gi, lineBreakMarker)
      .replace(/[\u00a0\u1680\u2000-\u200b\u202f\u205f\u3000\uFEFF\u2060]/g, " ");
    const lines = normalized.split("\n");
    const output = [];

    for (let index = 0; index < lines.length;) {
      if (!lines[index].includes("|")) {
        output.push(formatInline(lines[index]));
        index += 1;
        continue;
      }

      const tableLines = [];
      while (index < lines.length && lines[index].includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const tableText = formatTable(tableLines);
      if (tableText === null) {
        output.push(...tableLines.map(formatInline));
      } else {
        output.push(tableText);
      }
    }

    return output.join("\n")
      .replace(new RegExp(lineBreakMarker, "g"), "\n  ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  window.KanbanText = Object.freeze({ toReadableText });
})();
