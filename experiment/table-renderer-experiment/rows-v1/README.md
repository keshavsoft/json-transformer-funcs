# Rows V1

This prototype has exactly one responsibility:

> Build the body row skeleton.

It does not know:
- column names
- row keys
- cell values
- header/footer
- actions

Input rows determine only how many `<tr>` elements exist.

Each row starts with:

```json
{
  "tagName": "tr",
  "children": []
}
```

Columns are inserted later by `columns-v1`.
