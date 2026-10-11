# json-transformer-funcs Documentation

[![npm version](https://img.shields.io/npm/v/json-transformer-funcs.svg?style=flat-square)](https://www.npmjs.com/package/json-transformer-funcs)
[![docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue.svg?style=flat-square)](https://keshavsoft.github.io/json-transformer-funcs/)
[![GitHub repo](https://img.shields.io/badge/GitHub-keshavsoft%2Fjson--transformer--funcs-181717?style=flat-square&logo=github)](https://github.com/keshavsoft/json-transformer-funcs)

This library provides focused transformation functions for compiling structured JSON data into HTML-ready tag trees.

---

## 🔗 Navigation & Ecosystem

| Destination | Link | Description |
| :--- | :--- | :--- |
| 🏠 **Main README** | [github.com/keshavsoft/json-transformer-funcs#readme](https://github.com/keshavsoft/json-transformer-funcs#readme) | GitHub Overview & Quickstart |
| 📦 **npm Package** | [npmjs.com/package/json-transformer-funcs](https://www.npmjs.com/package/json-transformer-funcs) | Official npm release |
| 🐙 **Source Code** | [github.com/keshavsoft/json-transformer-funcs](https://github.com/keshavsoft/json-transformer-funcs) | GitHub repository |
| 🏷️ **DOM Renderer** | [github.com/keshavsoft/json-to-tag](https://github.com/keshavsoft/json-to-tag) | Renders the compiled JSON spec into DOM nodes |
| 🐛 **Report Issues** | [github.com/keshavsoft/json-transformer-funcs/issues](https://github.com/keshavsoft/json-transformer-funcs/issues) | GitHub issues |

---

## 💡 Design Principles

1. **Separation of Concerns**:
   - **Data** (`data.json`) contains only raw table information (`columns`, `rows`).
   - **Spec** (`spec.json`) defines how individual cells and rows should look.
   - **Table** (`table.json`) defines the surrounding wrapper (`table`, `thead`, `tbody`) and styling classes.

2. **Template Directives**:
   - `${columnName}`: Extracted from column objects to populate header cells (`<th>`).
   - `${rowValue}`: Extracted from row objects to populate body cells (`<td>`).

3. **End-to-End Pipeline**:
   Pair with **[`json-to-tag`](https://github.com/keshavsoft/json-to-tag)** to directly mount generated tables into the browser DOM:
   ```javascript
   import { tableFromData } from "json-transformer-funcs";
   import { jsonToTag } from "json-to-tag";

   const spec = tableFromData({ inData, inSpec, inTable });
   const element = jsonToTag(spec);
   document.body.appendChild(element);
   ```

---

## 📚 API Reference

### `tableFromData({ inData, inSpec, inTable })`
- **Parameters**:
  - `inData` `{Object}`: An object with `columns` (array) and `rows` (array).
  - `inSpec` `{Object}`: An object with `buildHeader` and `buildBody` configurations.
  - `inTable` `{Object}`: The base table node structure.
- **Returns**: `{Object}` A fully populated table specification ready for HTML rendering.

### `collectionFromKey(inSource, inTemplate)`
- **Parameters**:
  - `inSource` `{Array}`: Array of column objects.
  - `inTemplate` `{Object}`: Template containing `${keyName}` in `textContent`.
- **Returns**: `{Array}` Array of generated header element objects.

### `collectionFromInternal(inSource, outerTemplate, innerTemplate)`
- **Parameters**:
  - `inSource` `{Array}`: Array of data row objects.
  - `outerTemplate` `{Object}`: Row template (usually `<tr>`).
  - `innerTemplate` `{Object}`: Cell template (usually `<td>` with `${rowValue}`).
- **Returns**: `{Array}` Array of row element objects with populated cells as children.

---

## 🌐 Rendering with `json-to-tag` CDN

The output of `tableFromData` is a standard JSON-to-tag specification object. Pass it directly to `buildSpecElement` loaded from the `json-to-tag` CDN:

```javascript
import { tableFromData } from "../src/index.js";
import buildSpecElement from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

const specTree = tableFromData({ inData, inSpec, inTable });
const domElement = buildSpecElement(specTree);
document.getElementById("table-container").appendChild(domElement);
```

For runnable examples and standalone files, see [../samples/README.md](../samples/README.md).

---

## 📄 License
MIT © [KeshavSoft](https://github.com/keshavsoft)
