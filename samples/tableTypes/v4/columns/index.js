import { collectionFromArray } from "../../../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import instructions from "./instuctions.json" with { type: "json" };

let tempTableJson = structuredClone(tableJson);

const setByPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);

    // console.log("target : ", target);

    return target;
    // target[lastKey] = value;
};

const functionRegistry = {
    collectionFromArray: ({ source, template }) =>
        collectionFromArray(source, template)
};

const target = setByPath(tempTableJson, instructions[0].destinationPath);

target.forEach((element, loopRowIndex) => {
    const builtRow = sampleData.columns.map(loopColumn => {
        let specTd = structuredClone(sampleSpec?.buildBodyRow);

        specTd.textContent = sampleData.rows[loopRowIndex][loopColumn.columnName]

        return specTd;
    });

    element.children = builtRow;
});

console.log(JSON.stringify(tempTableJson, null, 2));