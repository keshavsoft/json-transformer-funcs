import buildRows from "./index.js";
import data from "./sampleData.json" with { type: "json" };

console.log(JSON.stringify(buildRows(data.rows), null, 2));
