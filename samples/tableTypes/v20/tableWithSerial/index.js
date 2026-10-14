import {
    fromCollection, tableBody, buildBody,
    findByRole, resolvePath, applyTemplate
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };

import columnInstructions from "./config/columnInstructions.json" with { type: "json" };
import rowInstructions from "./config/rowInstructions.json" with { type: "json" };
import serialInstructions from "./config/serialInstructions.json" with { type: "json" };
import optionsInstructions from "./config/optionsInstructions.json" with { type: "json" };

import data from "./batches.json" with { type: "json" };
import writePath from "./writePath/index.js";

// 1. Keep the input, table structure, and templates together as the build context.
const registry = { data: {}, base, spec };
const functions = {
    fromCollection,
    tableBody,
    buildBody,
    applyTemplate: (inSource, inTemplate) => applyTemplate(inTemplate, inSource)
};

// 2. Apply each instruction: read source, build result, write destination.
const runInstructions = instructions => {
    instructions.forEach(instruction => {
        const source = resolvePath(registry, instruction.sourcePath);

        if (source) {
            const result = functions[instruction.func](source, spec[instruction.templateKey]);
            writePath(registry, instruction.destinationPath, result);
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

    buildBody(findByRole(base, "table-body").children, data, spec);

    if (data.serial) {
        runInstructions(serialInstructions);
    }

    if (data.options) {
        runInstructions(optionsInstructions);
    }

    return base;
};

const table = startFunc({
    data,
    columns: [{
        columnName: "itemName", width: "300px", template: {
            bodyCell: "buildBodyCell"
        }
    },
    { columnName: "baseUnit", width: "200px" },
    {
        columnName: "batches", width: "100px", template: {
            bodyCell: "buttonCell"
        }
    }
    ],
    serial: {
        col: { width: "50px" },
        header: { columnName: "#" },
        body: {},
        footer: {}
    }
});

// console.log("table : ", table);

// console.log("colgroup : ", JSON.stringify(table.children[0], null, 2));
// console.log("header : ", JSON.stringify(table.children[1], null, 2));
console.log("body row 0 : ", JSON.stringify(table.children[2].children[0], null, 2));
// console.log("footer : ", JSON.stringify(table.children[3], null, 2));

// export default startFunc;
