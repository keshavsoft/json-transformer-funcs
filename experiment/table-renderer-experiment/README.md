# Table Renderer Experiment

This is a deliberately small experiment derived from the current renderer architecture.

## Two responsibilities

### rows-v1
Creates only the body row skeleton:

`rows -> tr[]`

No cells. No column knowledge.

### columns-v1
Takes the completed table skeleton and adds each column vertically across:

`colgroup -> thead -> tbody -> tfoot`

This makes `columns` the single source of truth for the table's vertical structure.

## Intended architecture

Input
  -> validation/sanitization
  -> row skeleton
  -> column insertion
  -> table JSON
  -> JSON-to-Tag

The experiment intentionally does not copy the full existing renderer implementation.
