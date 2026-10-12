import addColumns from "./index.js";
import table from "./sampleTable.json" with { type: "json" };
import data from "./sampleData.json" with { type: "json" };
import templates from "./templates.json" with { type: "json" };

const tableSpec = addColumns({
    table,
    columns: data.columns,
    rows: data.rows,
    templates
});

console.log(JSON.stringify(tableSpec, null, 2));
