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
            const dataList = structuredClone(template);
            const columnName = column.columnName;

            dataList.attributes = {
                ...dataList.attributes,
                id: columnName,
                "data-name": columnName
            };
            dataList.children = fromCollection(
                registry.data.data.map(row => ({ rowValue: row[columnName] })),
                spec.buildOption
            );

            return dataList;
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

const dataLists = startFunc({
    data: [{ name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
    ],
    columns: [{ columnName: "name", width: "300px" }, { columnName: "age", width: "100px" }]
});

console.log("all datalists : ", dataLists);
console.log("first datalist : ", dataLists.children[0]);
console.log("first option : ", dataLists.children[0].children[0]);
