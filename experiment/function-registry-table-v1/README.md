# Function Registry Table Experiment v1

This experiment is added inside the existing `json-transformer-funcs` repository. It leaves the existing source files unchanged.

It uses the actual v4 functions from this repository:

- `collectionFromKey` — builds header cells from column data and a header template.
- `collectionFromInternal` — builds body rows and cells from row data and body templates.

The table structure is copied from `json-renderers-build-table/src/v12/table.json`.

## Flow

`table.template.json` + `instructions.json` + `data.json` + `templates.json`

→ `executeInstructions.js`

→ completed JSON-to-Tag-compatible JSON tree

The instruction array chooses a registered function, its source data path, its template, and the destination path in the table JSON. The registry only exposes explicitly registered functions.

## Run

From this folder:

```bash
npm test
npm start
```

No new dependencies are required. The test verifies the generated header cells and body rows. This is a focused proof of concept, not a replacement for the existing v4 implementation.
