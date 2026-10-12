# Columns V1

This prototype has one responsibility:

> Add one complete vertical column to an already-created table skeleton.

For every column it appends exactly one item to:

1. `colgroup`
2. `thead > tr`
3. every `tbody > tr`
4. `tfoot > tr`

`columns` is the single source of truth for the vertical structure.

For the body, the column's `key` is looked up in the corresponding row.

If the key is absent, the `<td>` is still created and remains empty.

The column builder does not create rows.
The row builder does not create cells.
