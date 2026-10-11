// 1. Import json-to-tag directly from CDN
import buildSpecElement from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";
import { collectionFromKey, collectionFromInternal } from "../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import sampleTable from "./sampleTable.json" with { type: "json" };

const tableFromData = ({ inData, inSpec, inTable }) => {
    const localTable = structuredClone(inTable);
    const localHead = collectionFromKey(inData.columns, inSpec.buildHeader);
    const localBody = collectionFromInternal(
        inData.rows,
        inSpec.buildBody.outerTemplate,
        inSpec.buildBody.innerTemplate
    );

    const thead = localTable.children.find(c => c.tagName === "thead");
    const tbody = localTable.children.find(c => c.tagName === "tbody");

    thead.children[0].children = localHead;
    tbody.children = localBody;

    return localTable;
};

// 6. Execute Pipeline
try {
    const compiledSpec = tableFromData({
        inData: sampleData,
        inSpec: sampleSpec,
        inTable: sampleTable
    });

    // Render native DOM node using json-to-tag CDN
    const domElement = buildSpecElement(compiledSpec);

    const mount = document.getElementById("table-mount-point");
    mount.innerHTML = "";
    mount.appendChild(domElement);
} catch (err) {
    console.error(err);
    document.getElementById("status-badge").className = "badge bg-danger";
    document.getElementById("status-badge").textContent = "Render Error";
}