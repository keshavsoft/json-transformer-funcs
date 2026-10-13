# BuildSpec

Build a table specification from input data and a base structure.

## The story

1. `config/` describes the table, templates, and build instructions.
2. `path/` locates a JSON object or a node identified by `data-role`, then follows an optional `filePath`.
3. `functions/` contains table-specific operations such as serial numbers and options.
4. `index.js` coordinates the build: resolve source → run function → write destination → return the completed base.

## Instruction paths

Both `sourcePath` and `destinationPath` identify a registered JSON object with `fileName`. Add `dataRole` to begin at a matching node; add `filePath` to navigate inside the selected object or node.

```json
{
  "destinationPath": {
    "fileName": "base",
    "dataRole": "table-body",
    "filePath": ["children"]
  },
  "sourcePath": {
    "fileName": "data",
    "filePath": ["data"]
  },
  "templateKey": "buildBodyTr",
  "func": "fromCollection"
}
```
