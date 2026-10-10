# json-transformer-funcs

[![npm version](https://img.shields.io/npm/v/json-transformer-funcs.svg?style=flat-square)](https://www.npmjs.com/package/json-transformer-funcs)
[![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue.svg?style=flat-square)](https://keshavsoft.github.io/json-transformer-funcs/)
[![GitHub repo](https://img.shields.io/badge/GitHub-keshavsoft%2Fjson--transformer--funcs-181717?style=flat-square&logo=github)](https://github.com/keshavsoft/json-transformer-funcs)
[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/keshavsoft/json-transformer-funcs/blob/main/package.json)

> Pure JavaScript transformation functions that compile tabular data into structured JSON-to-tag table specifications.

---

## 🔗 Quick Links

| Resource | Link | Description |
| :--- | :--- | :--- |
| 📦 **npm Registry** | [npmjs.com/package/json-transformer-funcs](https://www.npmjs.com/package/json-transformer-funcs) | Install via npm |
| 🐙 **GitHub Repository** | [github.com/keshavsoft/json-transformer-funcs](https://github.com/keshavsoft/json-transformer-funcs) | Source code, issues & releases |
| 🌐 **GitHub Pages Docs** | [keshavsoft.github.io/json-transformer-funcs](https://keshavsoft.github.io/json-transformer-funcs/) | Live documentation website |
| 🟢 **Minimal Simple HTML** | [simple.html](simple.html) | Minimal 8-line example: reads 3 JSON files and renders via CDN |
| 📊 **Interactive Samples** | [samples/README.md](samples/README.md) | Modular and standalone CDN samples |
| ⚡ **Single-File CDN Demo** | [samples/cdn-standalone.html](samples/cdn-standalone.html) | Ready-to-run zero-build browser example |
| 📖 **Internal Docs** | [docs/README.md](docs/README.md) | In-repo architectural reference |

---

## 📖 The Story: 3 Simple Pieces

Building a clean, flexible data table without mixing concerns requires three distinct building blocks:

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│    data.json     │      │    spec.json     │      │    table.json    │
│  (Columns, Rows) │  +   │   (th, tr, td)   │  +   │  (table scaffold)│
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                                   ▼
                            tableFromData()
                                   │
                                   ▼
                         Full Table JSON Tree
                     (Ready for HTML / DOM render)
```

1. **`data.json` (Data)**: The raw tabular dataset containing `columns` and `rows`.
2. **`spec.json` (Cell Blueprint)**: Element templates for headers (`th` with `${columnName}`) and body cells (`td` with `${rowValue}`).
3. **`table.json` (Table Scaffold)**: The outer DOM structure (`table`, `thead`, `tbody`) with classes and attributes.

---

## 🚀 Installation & Quickstart

```bash
npm install json-transformer-funcs
```

```javascript
import { tableFromData } from "json-transformer-funcs";

import data from "./data.json" with { type: 'json' };
import spec from "./spec.json" with { type: 'json' };
import table from "./table.json" with { type: 'json' };

const fullTable = tableFromData({
  inData: data,
  inSpec: spec,
  inTable: table
});

console.log(JSON.stringify(fullTable, null, 2));
```

---

## 🧩 The Core Functions

### 1. `collectionFromKey(inSource, inTemplate)`
Transforms column definitions into an array of header nodes (`<th>`).
- Reads the key placeholder directly from `inTemplate.textContent` (e.g., `"${columnName}"`).
- Extracts each column's name dynamically without needing hardcoded keys.

### 2. `collectionFromInternal(inSource, outerTemplate, innerTemplate)`
Transforms row records into an array of row nodes (`<tr>`) containing child cells (`<td>`).
- Replaces `${rowValue}` in `innerTemplate.textContent` with the actual cell value.

### 3. `tableFromData({ inData, inSpec, inTable })`
The unified orchestrator that brings everything together into a single step:
- Builds `thead` cells via `collectionFromKey`
- Builds `tbody` rows via `collectionFromInternal`
- Locates `thead` and `tbody` inside `inTable` by `tagName`
- Injects the generated children and returns the complete table tree

---

## 📂 Example Input Files

### `data.json`
```json
{
  "columns": [
    { "columnName": "itemName" },
    { "columnName": "reservedName" }
  ],
  "rows": [
    { "itemName": "0.09/30mm", "reservedName": "" },
    { "itemName": "Keshav", "reservedName": "Nalam" }
  ]
}
```

### `spec.json`
```json
{
  "buildHeader": {
    "tagName": "th",
    "textContent": "${columnName}"
  },
  "buildBody": {
    "outerTemplate": {
      "tagName": "tr"
    },
    "innerTemplate": {
      "tagName": "td",
      "textContent": "${rowValue}"
    }
  }
}
```

### `table.json`
```json
{
  "tagName": "table",
  "attributes": {
    "class": "table table-hover table-striped align-middle border mb-0"
  },
  "children": [
    {
      "tagName": "thead",
      "attributes": { "class": "table-dark" },
      "children": [
        { "tagName": "tr", "children": [] }
      ]
    },
    {
      "tagName": "tbody",
      "children": []
    }
  ]
}
```

---

## 🎯 Output Tree

```json
{
  "tagName": "table",
  "attributes": {
    "class": "table table-hover table-striped align-middle border mb-0"
  },
  "children": [
    {
      "tagName": "thead",
      "attributes": { "class": "table-dark" },
      "children": [
        {
          "tagName": "tr",
          "children": [
            { "tagName": "th", "textContent": "itemName" },
            { "tagName": "th", "textContent": "reservedName" }
          ]
        }
      ]
    },
    {
      "tagName": "tbody",
      "children": [
        {
          "tagName": "tr",
          "children": [
            { "tagName": "td", "textContent": "0.09/30mm" },
            { "tagName": "td", "textContent": "" }
          ]
        },
        {
          "tagName": "tr",
          "children": [
            { "tagName": "td", "textContent": "Keshav" },
            { "tagName": "td", "textContent": "Nalam" }
          ]
        }
      ]
    }
  ]
}
```

---

## 🌐 Live DOM Rendering with `json-to-tag` CDN

Once `tableFromData()` compiles the unified JSON specification tree, you can immediately render it into native browser DOM elements using the **`json-to-tag` CDN engine**:

### CDN Endpoints

| Provider | URL | Type |
| :--- | :--- | :--- |
| **GitHub Pages CDN (Recommended)** | `https://keshavsoft.github.io/json-to-tag/dist/v9/min.js` | ES Module / Global |
| **GitHub Pages (Latest Alias)** | `https://keshavsoft.github.io/json-to-tag/dist/min.js` | ES Module / Global |
| **jsDelivr CDN** | `https://cdn.jsdelivr.net/npm/@keshavsoft/json-to-tag@1.9.3/docs/dist/v9/min.js` | ES Module |

### Complete Browser Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Table Demo</title>
  <!-- Bootstrap 5 for clean table styles -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4 bg-light">
  <div class="container">
    <div id="table-container" class="table-responsive"></div>
  </div>

  <script type="module">
    // 1. Import json-transformer-funcs and json-to-tag CDN
    import { tableFromData } from "./src/index.js";
    import buildSpecElement from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

    // 2. Tabular Data
    const data = {
      columns: [{ columnName: "Product" }, { columnName: "Price" }],
      rows: [
        { product: "Micro Drill Bit", price: "$124.50" },
        { product: "End Mill 4-Flute", price: "$89.00" }
      ]
    };

    // 3. Cell Blueprint
    const spec = {
      buildHeader: { tagName: "th", textContent: "${columnName}" },
      buildBody: {
        outerTemplate: { tagName: "tr" },
        innerTemplate: { tagName: "td", textContent: "${rowValue}" }
      }
    };

    // 4. Outer Scaffold
    const table = {
      tagName: "table",
      attributes: { class: "table table-hover table-striped align-middle border bg-white" },
      children: [
        { tagName: "thead", attributes: { class: "table-dark" }, children: [{ tagName: "tr", children: [] }] },
        { tagName: "tbody", children: [] }
      ]
    };

    // 5. Compile Spec Tree
    const compiledSpec = tableFromData({ inData: data, inSpec: spec, inTable: table });

    // 6. Render Native DOM via json-to-tag CDN
    const domTable = buildSpecElement(compiledSpec);
    document.getElementById("table-container").appendChild(domTable);
  </script>
</body>
</html>
```

Check out [`samples/README.md`](samples/README.md) and [`samples/cdn-standalone.html`](samples/cdn-standalone.html) for full ready-to-run examples!

---

## 🔗 Related Resources
- 🌐 [GitHub Pages Documentation](https://keshavsoft.github.io/json-transformer-funcs/)
- 📦 [npm Package](https://www.npmjs.com/package/json-transformer-funcs)
- 🐙 [GitHub Repository](https://github.com/keshavsoft/json-transformer-funcs)
- 🐛 [Issue Tracker](https://github.com/keshavsoft/json-transformer-funcs/issues)

---

## 📄 License
MIT © [KeshavSoft](https://github.com/keshavsoft)