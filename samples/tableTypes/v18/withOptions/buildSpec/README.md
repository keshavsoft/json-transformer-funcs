# V18 buildSpec: named targets and paths

Each instruction uses the same shape for both ends:

- `fileName` selects an object from `jsonRegistry`.
- `dataRole` optionally finds a node marked with `attributes["data-role"]`.
- `filePath` optionally navigates within that selected object/node.

If `dataRole` is supplied, lookup starts at that role. If it is omitted, lookup starts at the registered object. This keeps instructions declarative and avoids hard-coded `children[2]` paths.

`index.js` stays the orchestrator: resolve source, run the named function, write to destination.
