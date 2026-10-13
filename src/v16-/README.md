# V16 table functions

This folder contains table-specific operations extracted from the V16 `withOptions/buildSpec` sample.

- `insertSerial/` adds the serial-number column to the table structure.
- `insertOptions/` adds the options column and its show/save cells.
- `index.js` exports both operations as the V16 public entry point.

The sample imports these functions from `src/v16` so this extraction is exercised. The original sample helper files are retained as reference during this stage. No `json-renderers-build` integration is performed here.

These functions currently mutate the supplied table specification in place; they are reusable table-building operations, but not mathematically pure functions.
