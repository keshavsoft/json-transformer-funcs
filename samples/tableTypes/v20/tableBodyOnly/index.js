import {
    fromCollection, tableBody, buildBody,
    findByRole, resolvePath
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };
import columnInstructions from "./config/columnInstructions.json" with { type: "json" };
import rowInstructions from "./config/rowInstructions.json" with { type: "json" };

// The story: start with a table shell, attach row and column instructions,
// then fill every row with real cell data based on the incoming records.
const registry = { data: {}, base, spec };
const tableFunctions = { fromCollection, tableBody, buildBody };

// Write the computed result back into the table structure at the requested path.
const writeResultToTarget = (path, value) => {
    const root = path.dataRole
        ? findByRole(registry[path.fileName], path.dataRole)
        : registry[path.fileName];
    const keys = [...(path.filePath ?? [])];
    const lastKey = keys.pop();
    const parent = keys.reduce((current, key) => current[key], root);
    parent[lastKey] = value;
};

// Apply all instructions to transform raw data into the table structure.
const applyInstructions = instructions => {
    instructions.forEach(instruction => {
        const source = resolvePath(registry, instruction.sourcePath);

        if (source) {
            const result = tableFunctions[instruction.func](source, spec[instruction.templateKey]);
            writeResultToTarget(instruction.destinationPath, result);
        } else {
            console.log("   !instruction : ", instruction);
            console.log("   !source : ", source);
        };
    });
};

// Build the final table JSON from the input data and the table template.
const buildTableFromData = data => {
    registry.data = data;

    applyInstructions(rowInstructions);
    applyInstructions(columnInstructions);

    // Once rows/columns are ready, convert every data row into actual table cells.
    buildBody(findByRole(base, "table-body").children, data, spec.buildBodyCell);

    return base;
};

const table = buildTableFromData({
    data: [{ name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
    ],
    columns: [{ columnName: "name", width: "300px" }, { columnName: "age", width: "100px" }]
});

console.log("body : ", table.children[0].children);


console.log("1st row : ", table.children[0].children[0]);
