import { fromCollection } from "json-transformer-funcs";
import spec from "./spec.json" with { type: "json" };

const buildOptionsForColumn = (columnName, rows) => {
    const source = rows.map(row => ({ rowValue: row[columnName] }));
    return fromCollection(source, spec.buildOption);
};

const options = buildOptionsForColumn("name", [
    { name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
]);

console.log("options only : ", options);

export default buildOptionsForColumn;
