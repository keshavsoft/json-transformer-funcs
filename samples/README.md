# v12 table samples

There are **four top-level sample cases** under [`samples/tableTypes/v12`](tableTypes/v12). They explore the same table-building idea in pieces: column-derived parts, repeated rows, instruction-driven assembly, and browser rendering. The nested `html/footer` folder is an integration subcase, not a fifth top-level case.

For the compact browser overview, see [`docs/index.html`](../docs/index.html). For the table pieces assembled into a complete JSON tree and rendered DOM, see [`docs/table-workflow.html`](../docs/table-workflow.html).

| Sample | What it shows |
| --- | --- |
| [`columns`](tableTypes/v12/columns) | Reuses column data for colgroup, header, and footer templates. Its current header and footer destination paths omit the row index, so those two generated lists do not land in the scaffold's cell arrays. |
| [`rows`](tableTypes/v12/rows) | Maps each record through a row template with `collectionFromKey`. The selected template is a bare `tr`, so this case creates empty rows and does not demonstrate cell generation. |
| [`rows_good`](tableTypes/v12/rows_good) | Has instructions for all four table parts, with paths into the scaffold. Its body instruction still selects the bare `buildBody` row template; `buildBody1`, which can create cells, is defined but unused. |
| [`html`](tableTypes/v12/html) | Composes inputs for a browser page and renders the returned JSON tree with `json-to-tag`. Its nested footer builder uses instructions to fill the header and footer; colgroup and body are separate composition steps. The current entry imports `data.json`; the larger `batches.json` file is not wired into it. |

The instruction files connect four things: a `sourceKey` in the input data, a `templateKey` in the template object, a registered helper named by `func`, and a `destinationPath` in the cloned table scaffold. The walkthrough explains this contract and shows both the footer sample's partial output and a complete composition.

The `.js` examples import local JSON files as ES modules. Run them in a Node version that supports JSON import attributes, or serve the browser example over HTTP so its module and JSON imports can load.

For the supported input shape, placeholder behavior, function signatures, and current implementation limits, see the [v12 guide and API reference](../docs/README.md). The samples demonstrate composition patterns; `tableFromData` is the simpler starting point when the default header/body table layout is sufficient.
