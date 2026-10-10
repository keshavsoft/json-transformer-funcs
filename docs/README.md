# json-transformer-funcs Documentation

This library provides focused transformation functions for compiling structured JSON data into HTML-ready tag trees.

## Design Principles

1. **Separation of Concerns**:
   - **Data** (`data.json`) contains only raw table information (`columns`, `rows`).
   - **Spec** (`spec.json`) defines how individual cells and rows should look.
   - **Table** (`table.json`) defines the surrounding wrapper (`table`, `thead`, `tbody`) and styling classes.

2. **Template Directives**:
   - `${columnName}`: Extracted from column objects to populate header cells (`<th>`).
   - `${rowValue}`: Extracted from row objects to populate body cells (`<td>`).

3. **No Fluff**:
   Functions are small, deterministic, and easily composed.

## API Reference

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
