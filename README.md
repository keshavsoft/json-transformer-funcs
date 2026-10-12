# json-transformer-funcs

[![npm version](https://img.shields.io/npm/v/json-transformer-funcs.svg)](https://www.npmjs.com/package/json-transformer-funcs)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./package.json)

Build reusable JSON table trees from column definitions, row records, tag templates, and a table scaffold. The current public entry point re-exports **`src/v12`**; this README documents that implementation only.

## What it does

This repository handles the table assembly step between application data and browser rendering. It turns column metadata into header cells, row values into repeated body cells, and places both into a caller-defined table structure. Keeping this step separate makes the same table layout reusable across datasets and lets callers change markup or styling through templates without coupling data processing to the DOM.

Give the transformer three things:

1. **Data** — column definitions and rows.
2. **Templates** — JSON objects that describe tags and contain `${name}` placeholders.
3. **A table scaffold** — the outer `table`, `thead`, and `tbody` structure.

`tableFromData` fills the header and body templates and returns a new JSON tree. It does not create browser elements. To render the result, pass the tree to a renderer such as [`json-to-tag`](https://github.com/keshavsoft/json-to-tag).

```text
data + templates + table scaffold
                 │
                 ▼
            tableFromData
                 │
                 ▼
          JSON tag tree
                 │
                 ▼
       optional DOM renderer
```

## Install

```bash
npm install json-transformer-funcs
```

The library uses ES modules and `structuredClone`.

## Quick start

```js
import { tableFromData } from "json-transformer-funcs";

const inData = {
  columns: [
    { columnName: "Product" },
    { columnName: "Price" }
  ],
  rows: [
    { product: "Drill bit", price: "$12.50" },
    { product: "End mill", price: "$89.00" }
  ]
};

const tableTree = tableFromData({ inData });

console.log(tableTree.children[0].children[0].children);
// [
//   { tagName: "th", textContent: "Product" },
//   { tagName: "th", textContent: "Price" }
// ]
```

The default templates use `${columnName}` for headers and `${rowValue}` for body cells. The default table scaffold supplies a `thead` and `tbody`. See the [v12 guide and API reference](docs/README.md) for custom templates, exact input requirements, and current limitations.

## Public API

```js
import {
  tableFromData,
  buildTable,
  collectionFromKey,
  collectionFromInternal,
  collectionFromArray,
  defaultSpec,
  defaultTable
} from "json-transformer-funcs";
```

`buildTable` is an alias of `tableFromData`. `defaultSpec` and `defaultTable` are the built-in header/body templates and table scaffold. `collectionFromArray` is exported but is not implemented yet; it currently returns `undefined`.

## v12 source and examples

- Public implementation: [`src/v12`](src/v12)
- End-user guide and live preview: [`docs/index.html`](docs/index.html)
- Contributor guide: [`docs/developer-guide.html`](docs/developer-guide.html)
- Architecture guide: [`docs/architecture.html`](docs/architecture.html)
- Detailed API reference: [`docs/README.md`](docs/README.md)
- v12 sample map: [`samples/README.md`](samples/README.md)

The repository contains other historical source and sample folders. They are not part of this v12 guide.

## License

MIT — see [package.json](package.json).
