import {
    collectionFromKey, collectionToCollection,
    applyTemplate, tableBody
} from "../../../../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import columnInstuctions from "./columnInstuctions.json" with { type: "json" };
import rowInstuctions from "./rowInstuctions.json" with { type: "json" };

const setByPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);
    target[lastKey] = value;
};

const appendToTargetPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);
    target[lastKey].push(value);
};

const functionRegistry = {
    collectionFromKey: ({ source, template }) =>
        collectionFromKey(source, template),
    collectionToCollection: ({ source, template }) =>
        collectionToCollection(source, template),
    applyTemplate: (inTemplate, inElement) =>
        applyTemplate(inTemplate, inElement),
    tableBody: (inTemplate, inRowData, inColumns) =>
        tableBody(inTemplate, inRowData, inColumns),
};

const startFunc = (inData) => {
    let tempTableJson = structuredClone(tableJson);

    let afterRows = runRowInstuctions(tempTableJson);
    let afterColumns = runColumnInstuctions(afterRows);
    let afterBody = buildBody(afterColumns);

    return afterBody;
};

const runColumnInstuctions = (tempTableJson) => {
    sampleData?.columns.forEach(loopColumn => {
        columnInstuctions.forEach(instruction => {
            const sourceKey = instruction.sourceKey;
            const templateKey = instruction.templateKey;
            const func = instruction.func;
            const destinationPath = instruction.destinationPath;
            // console.log("func : ", functionRegistry, func);

            if (sourceKey && templateKey && func && destinationPath) {
                let template = sampleSpec[templateKey];

                const result = functionRegistry[func](template, loopColumn);

                appendToTargetPath(tempTableJson, destinationPath, result);
            } else {
                console.log("instruction not complete : ", instruction);
            };
        });

    });

    return tempTableJson;
};

const runRowInstuctions = (tempTableJson) => {
    rowInstuctions.forEach(instruction => {
        const sourceKey = instruction.sourceKey;
        const templateKey = instruction.templateKey;
        const func = instruction.func;
        const destinationPath = instruction.destinationPath;
        // console.log("func : ", functionRegistry, func);

        if (sourceKey && templateKey && func && destinationPath) {
            let source = sampleData[sourceKey];
            let template = sampleSpec[templateKey];

            const input = {
                source,
                template
            };

            const result = functionRegistry[func](input);

            setByPath(tempTableJson, destinationPath, result);
        } else {
            console.log("instruction not complete : ", instruction);

        };
    });

    return tempTableJson;
};

const buildBody = (tempTableJson) => {
    tempTableJson.children[2].children.forEach((loopRow, loopIndex) => {
        const row = sampleData?.data[loopIndex];
        const bodyRow = functionRegistry?.tableBody(sampleSpec?.buildBodyCell, row, sampleData?.columns);
        loopRow.children = bodyRow;
    });

    return tempTableJson;
};

// startFunc(sampleData);

export default startFunc;