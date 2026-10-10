# json-transformer-funcs

> Pure JavaScript transformation functions that compile tabular data into structured JSON-to-tag table specifications.

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

## 🚀 Quickstart

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
- Extracts each column's name without needing hardcoded keys.

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

## 📂 Example Files

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

## 🎯 Output

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

## 📄 License
MIT © [KeshavSoft](https://github.com/keshavsoft)