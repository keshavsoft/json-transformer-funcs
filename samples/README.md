# v12 samples

These examples are grouped under [`samples/tableTypes/v12`](tableTypes/v12) and use the repository entry `src/index.js`, which re-exports the current `src/v12` API.

For a compact end-to-end browser example, see [`docs/simple.html`](../docs/simple.html).

| Sample | What it shows |
| --- | --- |
| [`columns`](tableTypes/v12/columns) | Applying templates to column data for a colgroup, header, and footer controls. |
| [`rows`](tableTypes/v12/rows) | Mapping data items into repeated row templates. |
| [`rows_good`](tableTypes/v12/rows_good) | Combining colgroup, header, body, and footer template results in a table scaffold. |
| [`html`](tableTypes/v12/html) | Composing the table specification for a browser page and rendering it with `json-to-tag`. |

The `.js` examples import local JSON files as ES modules. Run them in a Node version that supports JSON import attributes, or serve the browser example over HTTP so its module and JSON imports can load.

For the supported input shape, placeholder behavior, function signatures, and current implementation limits, see the [v12 guide and API reference](../docs/README.md). The samples demonstrate composition patterns; `tableFromData` is the simpler starting point when the default header/body table layout is sufficient.
