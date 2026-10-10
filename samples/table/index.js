import { tableFromData } from "../../src/index.js";
import buildSpecElement from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

import data from "./data.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };
import table from "./table.json" with { type: "json" };

const render = () => {
  const startTime = performance.now();
  const container = document.getElementById("table-container");
  const specViewer = document.getElementById("spec-viewer");
  const statsContainer = document.getElementById("render-stats");

  try {
    // Step 1: Compile Data + Spec + Table scaffold into unified JSON Spec
    const compiledTableSpec = tableFromData({
      inData: data,
      inSpec: spec,
      inTable: table
    });

    console.log("1. Compiled Table Spec (from json-transformer-funcs):", compiledTableSpec);

    // Step 2: Use json-to-tag CDN engine to convert JSON Spec into live DOM
    const liveDomTable = buildSpecElement(compiledTableSpec);

    console.log("2. Live DOM Table (rendered by json-to-tag CDN):", liveDomTable);

    // Step 3: Mount the native DOM element
    if (container) {
      container.innerHTML = "";
      container.appendChild(liveDomTable);
    }

    // Optional: Render inspection views if containers exist
    if (specViewer) {
      specViewer.textContent = JSON.stringify(compiledTableSpec, null, 2);
    }

    const duration = (performance.now() - startTime).toFixed(2);
    if (statsContainer) {
      statsContainer.innerHTML = `
        <span class="badge bg-success-subtle text-success border border-success-subtle me-2">
          <i class="bi bi-check-circle me-1"></i>Rendered in ${duration}ms
        </span>
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle me-2">
          Columns: ${data.columns.length}
        </span>
        <span class="badge bg-info-subtle text-info border border-info-subtle">
          Rows: ${data.rows.length}
        </span>
      `;
    }
  } catch (error) {
    console.error("Render failed:", error);
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <strong>Rendering Error:</strong> ${error.message}
        </div>
      `;
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
