import {
    fromCollection,
    findByRole, resolvePath
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };
import columnInstructions from "./config/columnInstructions.json" with { type: "json" };

const registry = { data: {}, base, spec };
const functions = {
    fromCollection,
    buildControlForColumn: (columns, template) => {
        return columns.map(column => {
            const select = structuredClone(template);
            const columnName = column.columnName;

            select.attributes = {
                ...select.attributes,
                id: columnName,
                name: columnName
            };
            select.children = fromCollection(
                registry.data.data.map(row => ({ rowValue: row[columnName] })),
                spec.buildOption
            );

            return select;
        });
    }
};

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
            console.log("!instruction : ", instruction);
            console.log("!source : ", source);
        }
    });
};

const startFunc = data => {
    registry.data = data;
    runInstructions(columnInstructions);
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
