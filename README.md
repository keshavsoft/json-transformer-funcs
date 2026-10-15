# json-transformer-funcs

> One registry. One runner. Three engines. Any HTML element — built from pure JSON.

[![npm](https://img.shields.io/npm/v/json-transformer-funcs)](https://www.npmjs.com/package/json-transformer-funcs)

---

## Install

```bash
npm install json-transformer-funcs
```

---

## The Idea

Every HTML element is a JSON object: `{ tagName, attributes, textContent, children }`.
Every list of HTML elements is a JSON array.

If you can describe the shape of an element in JSON — this library can build it from data.

No DOM. No template language. No framework. Pure data in, pure JSON tree out.

---

## The Three Engines

```javascript
import {
    fromCollection,  // one-dimension  — array of elements
    twoDimensional,  // two-dimensions — grid of rows x cells
    resolvePath,     // path reader
    findByRole       // node finder
} from "json-transformer-funcs";
```

| Package | Function | Responsibility |
| :--- | :--- | :--- |
| `json-transformer-funcs-primitive` | `applyTemplate` | One element from one data object |
| `json-transformer-funcs-one-dimension` | `fromCollection` | A list of elements from a list of objects |
| `json-transformer-funcs-two-dimensions` | `twoDimensional` | A grid of rows x cells from columns x data rows |

---

## The Dimension Rule

| You have | You use | You get |
| :--- | :--- | :--- |
| One object, one template | `applyTemplate` | One node |
| An array of objects, one template | `fromCollection` | An array of nodes |
| Columns x data rows, a spec | `twoDimensional` | `<tr>` rows each with `<td>` cells |

`<col>`, `<th>`, `<option>` are 1-D — all produced by `fromCollection`.
`<tr>[<td>]` is 2-D — produced by `twoDimensional`.
The container (`<table>`, `<select>`, `<datalist>`) lives in `base.json` — you configure it, not compute it.

---

## The Four Core Files

Every sample in v24 is built from the same four files:

### 1. `spec.json` — The Template Library

Named templates. Each key is a reusable element shape with `${placeholder}` slots.

```json
{
    "buildColGroup":  { "tagName": "col",    "attributes": { "width": "${width}" } },
    "buildHeader":    { "tagName": "th",     "textContent": "${columnName}" },
    "buildBodyCell":  { "tagName": "td",     "textContent": "${rowValue}" },
    "buttonCell":     { "tagName": "td",     "children": [{ "tagName": "button", "textContent": "${agg:count}" }] },
    "buildOption":    { "tagName": "option", "textContent": "${rowValue}", "attributes": { "value": "${rowValue}" } }
}
```

### 2. `config/base.json` — The Structural Skeleton

Pre-built output shape — empty. Results are written into it using `data-role` addressing.

```json
{
    "tagName": "table",
    "children": [
        { "tagName": "colgroup", "attributes": { "data-role": "table-colgroup" }, "children": [] },
        { "tagName": "thead",    "attributes": { "data-role": "table-header"  }, "children": [
            { "tagName": "tr",   "attributes": { "data-role": "table-header-row" }, "children": [] }
        ]},
        { "tagName": "tbody",    "attributes": { "data-role": "table-body"    }, "children": [] }
    ]
}
```

For `<select>` or `<datalist>`, the base is simply the container node:
```json
{ "tagName": "select", "attributes": { "data-role": "select-control", "id": "ledgerSelect" }, "children": [] }
```

### 3. `instructions/single.json` — The Build Plan

Declarative steps. Each step names: source path, function, template key, destination path.

```json
[
    {
        "narration":       "Build the column widths.",
        "sourcePath":      { "fileName": "data", "filePath": ["columns"] },
        "templateKey":     "buildColGroup",
        "func":            "fromCollection",
        "destinationPath": { "fileName": "base", "dataRole": "table-colgroup", "filePath": ["children"] }
    }
]
```

Same format for options — only the keys change:
```json
[
    {
        "narration":       "Build option elements.",
        "sourcePath":      { "fileName": "data", "filePath": ["items"] },
        "templateKey":     "buildOption",
        "func":            "fromCollection",
        "destinationPath": { "fileName": "base", "dataRole": "select-control", "filePath": ["children"] }
    }
]
```

### 4. `index.js` — The Runner

```javascript
import { fromCollection, twoDimensional, resolvePath } from "json-transformer-funcs";

const registry = { data, base, spec };
const functions = { fromCollection, twoDimensional };

const runInstructions = instructions => {
    instructions.forEach(instruction => {
        const source = resolvePath(registry, instruction.sourcePath);
        if (source) {
            const result = functions[instruction.func](source, spec[instruction.templateKey]);
            writePath(registry, instruction.destinationPath, result);
        }
    });
};
```

Three lines per instruction: **Read source → Transform → Write to base**. The runner does not know what it is building.

---

## Samples (v24)

```
samples/v24/
  table/simple/              full table: colgroup + header + body rows
  selectOptionsOnly/simple/  raw <option> list only
  select/simple/             <select> filled with <option> children
  dataList/simple/           <datalist> filled with <option> children
```

```bash
node ./samples/v24/table/simple/index.js
node ./samples/v24/select/simple/index.js
node ./samples/v24/dataList/simple/index.js
node ./samples/v24/selectOptionsOnly/simple/index.js
```

---

## Sibling Packages

| Package | npm |
| :--- | :--- |
| `json-transformer-funcs-primitive` | [![npm](https://img.shields.io/npm/v/json-transformer-funcs-primitive)](https://www.npmjs.com/package/json-transformer-funcs-primitive) |
| `json-transformer-funcs-one-dimension` | [![npm](https://img.shields.io/npm/v/json-transformer-funcs-one-dimension)](https://www.npmjs.com/package/json-transformer-funcs-one-dimension) |
| `json-transformer-funcs-two-dimensions` | [![npm](https://img.shields.io/npm/v/json-transformer-funcs-two-dimensions)](https://www.npmjs.com/package/json-transformer-funcs-two-dimensions) |

---

## License

MIT (c) KeshavSoft
