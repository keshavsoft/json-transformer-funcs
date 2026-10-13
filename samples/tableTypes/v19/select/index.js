import {
    fromCollection, tableBody, buildBody,
    insertSerial, insertOptions, findByRole, resolvePath
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };
import columnInstructions from "./config/columnInstructions.json" with { type: "json" };
import rowInstructions from "./config/rowInstructions.json" with { type: "json" };

// 1. Keep the input, table structure, and templates together as the build context.
const registry = { data: {}, base, spec };
const functions = { fromCollection, tableBody, buildBody };

// 2. Apply each instruction: read source, build result, write destination.
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
            console.log("result : ", result);

            writePath(instruction.destinationPath, result);
        } else {
            console.log("   !instruction : ", instruction);
            console.log("   !source : ", source);
        };
    });
};

// 3. Complete the table and return its JSON specification.
const startFunc = data => {
    registry.data = data;

    runInstructions(rowInstructions);

    runInstructions(columnInstructions);

    // buildBody(findByRole(base, "table-body").children, data, spec.buildBodyCell);

    // insertSerial(base, spec);
    // insertOptions(base, spec);

    return base;
};

const table = startFunc({
    data: [{ name: "Keshav" },
    { name: "Charan" }
    ],
    columns: [{ columnName: "name", width: "300px" }]
});

console.log("table : ", table);

// console.log("head : ", table.children[1].children[0]);

// export default startFunc;
