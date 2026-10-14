import {
    fromCollection,
    findByRole
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };

// Small adapter: convert one column into one select, using the reusable source function.
const buildOptionsForColumn = (columnName, rows) => {
    const source = rows.map(row => ({ rowValue: row[columnName] }));
    return fromCollection(source, spec.buildOption);
};

const buildSelectForColumn = (column, rows) => {
    const select = structuredClone(spec.buildSelect);
    const columnName = column.columnName;

    select.attributes = {
        ...select.attributes,
        id: columnName,
        name: columnName
    };
    select.children = buildOptionsForColumn(columnName, rows);

    return select;
};

const buildSelectsFromColumns = ({ data, columns }) => {
    return columns.map(column => buildSelectForColumn(column, data));
};

const startFunc = data => {
    const selectGroup = findByRole(base, "base-select");
    selectGroup.children = buildSelectsFromColumns(data);
    return base;
};

const selects = startFunc({
    data: [{ name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
    ],
    columns: [{ columnName: "name", width: "300px" }, { columnName: "age", width: "100px" }]
});

console.log("all selects : ", selects);
console.log("first select : ", selects.children[0]);
console.log("first option : ", selects.children[0].children[0]);
