import {
    fromCollection,
    findByRole, resolvePath
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };
import columnInstructions from "./config/columnInstructions.json" with { type: "json" };
import rowInstructions from "./config/rowInstructions.json" with { type: "json" };

// The story: one select for each column, and one option for each value in that column.
const registry = { data: {}, base, spec };
const functions = { fromCollection };

const writePath = (path, value) => {
    const root = path.dataRole
        ? findByRole(registry[path.fileName], path.dataRole)
        : registry[path.fileName];
    const keys = [...(path.filePath ?? [])];
    const lastKey = keys.pop();
    const parent = keys.reduce((current, key) => current[key], root);
    parent[lastKey] = value;
};

const runInstructions = instructions => {
    instructions.forEach(instruction => {
        const source = resolvePath(registry, instruction.sourcePath);

        if (source) {
            const result = functions[instruction.func](source, spec[instruction.templateKey]);
            writePath(instruction.destinationPath, result);
        } else {
            console.log("   !instruction : ", instruction);
            console.log("   !source : ", source);
        };
    });
};

const buildOptionsForColumn = (columnName, rows) => {
    const optionTemplate = structuredClone(spec.buildOption);

    return rows.map(row => {
        const option = structuredClone(optionTemplate);
        const value = row[columnName];

        option.textContent = value;
        option.attributes.value = value;

        return option;
    });
};

const buildSelectForColumn = (column, rows) => {
    const select = structuredClone(spec.buildSelect);
    const columnName = column.columnName;

    select.attributes.name = columnName;
    select.attributes.id = columnName;
    select.children = buildOptionsForColumn(columnName, rows);

    return select;
};

const buildSelectsFromColumns = ({ data, columns }) => {
    return columns.map(column => buildSelectForColumn(column, data));
};

const startFunc = data => {
    registry.data = data;

    runInstructions(rowInstructions);
    runInstructions(columnInstructions);

    const selects = buildSelectsFromColumns(data);
    const baseSelect = findByRole(base, "base-select");
    baseSelect.children = selects;

    return base;
};

const table = startFunc({
    data: [{ name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
    ],
    columns: [{ columnName: "name", width: "300px" }, { columnName: "age", width: "100px" }]
});

console.log("table : ", table);
console.log("first select : ", table.children[0]);
console.log("first option : ", table.children[0].children[0]);

// export default startFunc;
