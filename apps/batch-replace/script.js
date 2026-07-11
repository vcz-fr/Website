const CSV = {
  /**
   * Converts a single-column CSV string into an array of JSON objects.
   * Strictly ignores any column beyond the first.
   * @param {string} csv - The CSV string to parse.
   * @param {string} [delimiter=','] - The field delimiter.
   * @returns {Array} An array of flat objects containing exactly one property "0".
   */
  parse(csv, delimiter = ",") {
    if (!csv || typeof csv !== "string") return [];
    const rows = [];
    let currentRow = [];
    let currentField = "";
    let insideQuotes = false;
    // Single-pass state machine for maximum performance
    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const nextChar = csv[i + 1];
      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Handle escaped double quotes ("")
          currentField += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === delimiter && !insideQuotes) {
        currentRow.push(currentField);
        currentField = "";
      } else if ((char === "\n" || char === "\r") && !insideQuotes) {
        // Handle CRLF (\r\n)
        if (char === "\r" && nextChar === "\n") i++;
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
    // Catch remaining data if the file didn't end with a newline
    if (currentRow.length > 0 || currentField !== "") {
      currentRow.push(currentField);
      rows.push(currentRow);
    }
    if (rows.length === 0) return [];

    // Map rows to objects keeping strictly and only the first column
    const jsonArray = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // Skip empty rows (e.g., trailing newline at the end of the file)
      if (row.length === 1 && row[0] === "") continue;
      const obj = {
        0: row[0] ?? "",
      };
      jsonArray.push(obj);
    }
    return jsonArray;
  },

  /**
   * Converts a flat array of JSON objects into a header-less, single-column CSV string.
   * @param {Array} jsonArray - The array of objects to convert.
   * @param {string} [delimiter=','] - The field delimiter.
   * @returns {string} The generated single-column CSV string.
   */
  stringify(jsonArray, delimiter = ",") {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) return "";
    const csvRows = [];
    const replaceQuotesRegex = /"/g;
    for (const entry of jsonArray) {
      const value = entry === null || entry === undefined ? "" : String(entry);

      // Escape if it contains a delimiter, quotes, or newlines
      if (
        value.includes(delimiter) ||
        value.includes('"') ||
        value.includes("\n") ||
        value.includes("\r")
      ) {
        csvRows.push(`"${value.replace(replaceQuotesRegex, '""')}"`);
      } else {
        csvRows.push(value);
      }
    }
    return csvRows.join("\n");
  },
};

/**
 * Consistent helper function to format individual fields identically to CSV.stringify
 * @param {*} value - Raw value
 * @param {string} delimiter - The CSV field delimiter
 * @returns {string} The CSV-escaped and potentially quoted value representation
 */
const toCSVField = (value, delimiter = ",") => {
  const strValue = value === null || value === undefined ? "" : String(value);
  if (
    strValue.includes(delimiter) ||
    strValue.includes('"') ||
    strValue.includes("\n") ||
    strValue.includes("\r")
  ) {
    return `"${strValue.replace(/"/g, '""')}"`;
  }
  return strValue;
};

let rules = JSON.parse(localStorage.getItem("vczbr_rules")) || [];
let settings = JSON.parse(localStorage.getItem("vczbr_settings")) || {
  maxLength: 30,
  caseSensitive: false,
  globalMatch: true,
  stripDiacritics: true,
};
let processedInputs = [];
let processedOutputs = [];

const DOM = {
  inputLabels: document.getElementById("input-labels"),
  rulesContainer: document.getElementById("rules-container"),
  outputTableBody: document.querySelector("#output-table tbody"),
  settings: {
    maxLength: document.getElementById("setting-max-length"),
    caseSensitive: document.getElementById("setting-case-sensitive"),
    globalMatch: document.getElementById("setting-global"),
    stripDiacritics: document.getElementById("setting-strip-diacritics"),
  },
  templates: {
    ruleRow: document.getElementById("rule-row-template"),
    tableRow: document.getElementById("table-row-template"),
  },
  buttons: {
    process: document.getElementById("process-btn"),
    addRule: document.getElementById("add-rule"),
    exportRules: document.getElementById("export-rules-btn"),
    importRules: document.getElementById("import-rules-btn"),
    clearRules: document.getElementById("clear-rules-btn"),
    exportInputs: document.getElementById("export-inputs-btn"),
    exportOutputs: document.getElementById("export-outputs-btn"),
  },
  tabs: document.querySelectorAll(".tab-btn"),
  views: document.querySelectorAll(".view-section"),
};

DOM.settings.maxLength.value = settings.maxLength;
DOM.settings.caseSensitive.checked = settings.caseSensitive;
DOM.settings.globalMatch.checked = settings.globalMatch;
DOM.settings.stripDiacritics.checked = settings.stripDiacritics;

const saveState = () => {
  localStorage.setItem("vczbr_rules", JSON.stringify(rules));
  localStorage.setItem("vczbr_settings", JSON.stringify(settings));
};

Object.entries(DOM.settings).forEach(([key, element]) => {
  element.addEventListener("change", (e) => {
    settings[key] = key === "maxLength" ? parseInt(e.target.value) || 30 : e.target.checked;
    saveState();
    if (key === "maxLength") renderTable();
  });
});

DOM.buttons.addRule.addEventListener("click", () => {
  rules.push({ match: "", replace: "" });
  saveState();
  renderRules();
});

DOM.buttons.clearRules.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all text replacement rules? This action cannot be undone.")) {
    rules = [];
    saveState();
    renderRules();
  }
});

const moveRule = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= rules.length) return;
  [rules[index], rules[newIndex]] = [rules[newIndex], rules[index]];
  saveState();
  renderRules();
};

const renderRules = () => {
  DOM.rulesContainer.innerHTML = "";

  rules.forEach((rule, index) => {
    const clone = DOM.templates.ruleRow.content.cloneNode(true);

    const matchInput = clone.querySelector(".input-match");
    const replaceInput = clone.querySelector(".input-replace");
    const upBtn = clone.querySelector(".btn-up");
    const downBtn = clone.querySelector(".btn-down");
    const delBtn = clone.querySelector(".btn-delete");

    matchInput.value = rule.match;
    replaceInput.value = rule.replace;

    matchInput.addEventListener("input", (e) => {
      rules[index].match = e.target.value;
      saveState();
    });
    replaceInput.addEventListener("input", (e) => {
      rules[index].replace = e.target.value;
      saveState();
    });

    upBtn.disabled = index === 0;
    downBtn.disabled = index === rules.length - 1;

    upBtn.addEventListener("click", () => moveRule(index, -1));
    downBtn.addEventListener("click", () => moveRule(index, 1));
    delBtn.addEventListener("click", () => {
      rules.splice(index, 1);
      saveState();
      renderRules();
    });

    DOM.rulesContainer.appendChild(clone);
  });
};

async function fileExport(content, suggestedName, mimeType) {
  try {
    const blob = new Blob([content], { type: mimeType });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = suggestedName;
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    if (err.name !== "AbortError") console.error("Export failed", err);
  }
}

DOM.buttons.exportRules.addEventListener("click", () =>
  fileExport(JSON.stringify(rules, null, 2), "replacement_rules.json", "application/json")
);

DOM.buttons.exportInputs.addEventListener("click", () => {
  if (!processedInputs.length) return alert("No inputs to export.");
  fileExport(CSV.stringify(processedOutputs), "original.csv", "text/csv")
});

DOM.buttons.exportOutputs.addEventListener("click", () => {
  if (!processedInputs.length) return alert("No inputs to export.");
  fileExport(CSV.stringify(processedOutputs), "processed.csv", "text/csv")
});

DOM.buttons.importRules.addEventListener("click", async () => {
  try {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const reader = new FileReader();
      reader.onload = (event) => parseImportedRules(event.target.result);
      reader.readAsText(e.target.files[0]);
    };
    input.click();
  } catch (err) {
    if (err.name !== "AbortError") alert("Failed to import file.");
  }
});

function parseImportedRules(jsonText) {
  try {
    const importedRules = JSON.parse(jsonText);
    if (Array.isArray(importedRules)) {
      rules = rules.concat(
        importedRules.filter((r) => r && typeof r.match === "string" && typeof r.replace === "string"),
      );
      saveState();
      renderRules();
    } else {
      console.error("Malformed file: Expected a JSON array of rules.", err);
    }
  } catch (err) {
    console.error("Malformed file: Invalid JSON structure.", err);
  }
}

const switchTab = (targetId) => {
  DOM.tabs.forEach((b) => b.classList.toggle("active", b.getAttribute("data-target") === targetId));
  DOM.views.forEach((v) => v.classList.toggle("active", v.id === targetId));
};
DOM.tabs.forEach((btn) => btn.addEventListener("click", () => switchTab(btn.getAttribute("data-target"))));

const processStatements = () => {
  const rawText = DOM.inputLabels.value;
  processedInputs = [];
  processedOutputs = [];

  if (!rawText.trim()) {
    alert("Please paste data into the import field first.");
    switchTab("view-import");
    return;
  }

  const parsed = CSV.parse(rawText);
  if (parsed.length === 0) {
    alert(
      "No valid CSV data found. Make sure the input is a valid single-column CSV.",
    );
    switchTab("view-import");
    return;
  }

  // Constrained to strictly target column "0"
  const inputHeader = "0";

  const flags =
    (settings.globalMatch ? "g" : "") + (settings.caseSensitive ? "" : "i");
  const compiledRules = rules
    .filter((r) => r.match !== "")
    .flatMap((r) => {
      try {
        return [
          {
            regex: new RegExp(r.match, flags),
            replace: r.replace,
          },
        ];
      } catch (e) {
        return [];
      }
    });

  parsed.forEach((row) => {
    const originalTextUnquoted = row[inputHeader] ?? "";
    let processedTextUnquoted = originalTextUnquoted;

    if (settings.stripDiacritics) {
      processedTextUnquoted = processedTextUnquoted
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    compiledRules.forEach((rule) => {
      processedTextUnquoted = processedTextUnquoted.replace(
        rule.regex,
        rule.replace,
      );
    });

    processedInputs.push(originalTextUnquoted);
    processedOutputs.push(processedTextUnquoted);
  });

  renderTable();
  switchTab("view-comparison");
};

DOM.buttons.process.addEventListener("click", processStatements);

const renderTable = () => {
  DOM.outputTableBody.innerHTML = "";

  if (processedInputs.length === 0) {
    DOM.outputTableBody.innerHTML =
      '<tr><td colspan="2" style="text-align: center; color: #94a3b8; padding: 40px; font-family: sans-serif;">No statements found in input. Make sure the input is a valid CSV.</td></tr>';
    return;
  }

  processedInputs.forEach((inputStr, i) => {
    const outputStr = processedOutputs[i];
    const csvOutputStr = toCSVField(outputStr);

    const csvInputStr = toCSVField(inputStr);
    const isAcceptable = outputStr.length <= settings.maxLength;
    const clone = DOM.templates.tableRow.content.cloneNode(true);

    const tdOriginal = clone.querySelector(".td-original");
    const tdProcessed = clone.querySelector(".td-processed");

    tdOriginal.textContent = csvInputStr;
    tdProcessed.textContent = csvOutputStr;
    tdProcessed.className = isAcceptable ? "length-ok" : "length-exceeded";

    DOM.outputTableBody.appendChild(clone);
  });
};

renderRules();
