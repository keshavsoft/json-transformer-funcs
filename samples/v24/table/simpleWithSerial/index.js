import {
    fromCollection, resolvePath, twoDimensional, applyTemplate
} from "../../../../src/index.js";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };

import singleInstructions from "./instructions/single.json" with { type: "json" };
import twoDimensionalInstructions from "./instructions/double.json" with { type: "json" };
import serialInstructions from "./instructions/serialInstructions.json" with { type: "json" };
import optionsInstructions from "./instructions/optionsInstructions.json" with { type: "json" };

import batches from "./batches.json" with { type: "json" };

import writePath from "./writePath/index.js";

// 1. Keep the input, table structure, and templates together as the build context.
const registry = { data: {}, base, spec };
const functions = {
    fromCollection, twoDimensional, applyTemplate
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

const runInstructions2 = instructions => {
    instructions.forEach(instruction => {
        const result = functions[instruction.func](
            registry.data.columns,
            registry.data.data,
            spec
        );
        writePath(registry, instruction.destinationPath, result);
    });
};

// 3. Complete the table and return its JSON specification.
const startFunc = data => {
    registry.data = data;

    runInstructions(singleInstructions);

    runInstructions2(twoDimensionalInstructions);

    if (registry?.data.serial) {
        runInstructions(serialInstructions);
    };

    if (registry?.data?.options) {
        runInstructions(optionsInstructions);
    };

    return base;
};

const table = startFunc({
    data: batches,
    columns: [{
        columnName: "itemName", width: "300px", template: {
            body: {
                tr: "buildBodyTr",
                cell: "buildBodyCell"
            }
        }
    },
    {
        columnName: "baseUnit", width: "200px", template: {
            body: {
                tr: "buildBodyTr",
                cell: "buildBodyCell"
            }
        }
    },
    {
        columnName: "batches", width: "100px", template: {
            body: {
                tr: "buildBodyTr",
                cell: "buttonCell"
            }
        }
    }
    ],
    serial: {
        col: { width: "50px" },
        header: { columnName: "#" },
        body: {},
        footer: {}
    },
    options: {
        col: { width: "100px" },
        header: { columnName: "options" },
        body: { columnName: "show" },
        footer: { columnName: "save" }
    }
});

// console.log("colgroup : ", JSON.stringify(table.children[0], null, 2));
console.log("header : ", JSON.stringify(table.children[1], null, 2));

// console.log("body row 0 : ", JSON.stringify(table.children[2].children, null, 2));

// console.log("footer : ", JSON.stringify(table.children[3], null, 2));
