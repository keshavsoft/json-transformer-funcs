import { collectionFromKey } from "../../../../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import instructions from "./instuctions.json" with { type: "json" };

const setByPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);
    target[lastKey] = value;
};

const functionRegistry = {
    collectionFromKey: ({ source, template }) =>
        collectionFromKey(source, template),
};

const buildBody = (inSource, inData) => {
    const bodyWithCells = inSource.map((element, loopIndex) => {
        let rowCells = [];

        for (const [key, value] of Object.entries(inData[loopIndex])) {
            let bodyCell = structuredClone(sampleSpec?.buildBodyCell);
            // console.log("loopDataRow : ", loopDataRow);
            bodyCell.textContent = value;

            rowCells.push(bodyCell);
        };

        return {
            ...element,
            children: rowCells
        };
    });

    return bodyWithCells;
};

const startFunc = (inData) => {

    let tempTableJson = structuredClone(tableJson);

    instructions.forEach(instruction => {
        const input = {
            source: inData[instruction.sourceKey],
            template: sampleSpec[instruction.templateKey]
        };

        const result = functionRegistry[instruction.func](input);

        setByPath(tempTableJson, instruction.destinationPath, result);
    });

    const bodyCells = buildBody(tempTableJson.children[2].children, sampleData?.data);
    tempTableJson.children[2].children = bodyCells;

    console.log("body 1 : ", bodyCells[0]);
    console.log("body 2 : ", bodyCells[1]);

    // console.log("tempTableJson : ", tempTableJson.children[2].children);

    return tempTableJson;
};

startFunc(sampleData);

export default startFunc;
// console.log(JSON.stringify(tempTableJson, null, 2));
// console.log("colgroup : ", tempTableJson.children[0].children);
// console.log("head : ", tempTableJson.children[1].children);

// console.log("body : ", tempTableJson.children[2].children);

// console.log("footer1 : ", tempTableJson.children[3].children.children[0].children);
// console.log("footer2 : ", tempTableJson.children[3].children.children);

const buildBody1 = (inSource, inData) => {
    const bodyWithCells = inSource.map(element => {
        const bodyWithCells = inData.map(loopDataRow => {
            let rowCells = [];

            for (const [key, value] of Object.entries(loopDataRow)) {
                let bodyCell = structuredClone(sampleSpec?.buildBodyCell);
                // console.log("loopDataRow : ", loopDataRow);
                bodyCell.textContent = value;

                rowCells.push(bodyCell);
            };

            return {
                ...loopDataRow,
                children: rowCells
            };
        });
        // console.log("bodyWithCells : ", bodyWithCells);

        return {
            ...element,
            children: bodyWithCells
        };
    });

    return bodyWithCells;
};