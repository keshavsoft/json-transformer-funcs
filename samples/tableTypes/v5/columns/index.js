import { collectionFromArray } from "../../../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import instructions from "./instuctions.json" with { type: "json" };

let tempTableJson = structuredClone(tableJson);

const setArrayByPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);

    target.forEach((element, loopRowIndex) => {
        const builtRow = value.columns.map(loopColumn => {
            let specTd = structuredClone(sampleSpec?.buildBodyRow);

            specTd.textContent = value.rows[loopRowIndex][loopColumn.columnName]

            return specTd;
        });

        element.children = builtRow;
    });
};

setArrayByPath(tempTableJson, instructions[0].destinationPath, sampleData);

console.log(JSON.stringify(tempTableJson, null, 2));