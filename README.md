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
| 🏷️ **DOM Renderer** | [github.com/keshavsoft/json-to-tag](https://github.com/keshavsoft/json-to-tag) | Companion library to render specs into live DOM |
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
                                   │
                                   ▼
                      json-to-tag (DOM Renderer)
                      https://github.com/keshavsoft/json-to-tag
                                   │
                                   ▼
                        Live HTML / DOM Table
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

## 🖥️ Rendering to the DOM (`json-to-tag`)

`json-transformer-funcs` produces an abstract, pure JSON tag specification. 
To render this specification into real browser DOM elements, use our companion library **[`json-to-tag`](https://github.com/keshavsoft/json-to-tag)**:

```javascript
import { tableFromData } from "json-transformer-funcs";
import { jsonToTag } from "json-to-tag"; // https://github.com/keshavsoft/json-to-tag

// 1. Compile data + templates into the table tag specification
const tableSpec = tableFromData({
  inData: data,
  inSpec: spec,
  inTable: table
});

// 2. Render directly to live DOM elements
const tableElement = jsonToTag(tableSpec);
document.getElementById("app").appendChild(tableElement);
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

## 🔗 Related Resources
- 🌐 [GitHub Pages Documentation](https://keshavsoft.github.io/json-transformer-funcs/)
- 📦 [npm Package](https://www.npmjs.com/package/json-transformer-funcs)
- 🐙 [GitHub Repository](https://github.com/keshavsoft/json-transformer-funcs)
- 🏷️ [json-to-tag (DOM Renderer)](https://github.com/keshavsoft/json-to-tag)
- 🐛 [Issue Tracker](https://github.com/keshavsoft/json-transformer-funcs/issues)

---

## 📄 License
MIT © [KeshavSoft](https://github.com/keshavsoft)