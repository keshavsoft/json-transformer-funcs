import {
    fromCollection
} from "../../../../../src/index.js";

import data from "./data.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };
import base from "./base.json" with { type: "json" };
import columnInstuctions from "./columnInstuctions.json" with { type: "json" };
import rowInstuctions from "./rowInstuctions.json" with { type: "json" };

const jsonRegistry = {
    data,
    base,
    spec
};

const setByPath = (path, value) => {
    const jsonNeeded = path[0];

    const keys = path.slice(1);
    const lastKey = keys.pop();

    let target = keys.reduce((current, key) => current[key], jsonRegistry[jsonNeeded]);

    target[lastKey] = value;
};

const getByPath = (path) => {
    const jsonNeeded = path[0];

    const keys = path.slice(1);

    const target = keys.reduce((current, key) => current[key], jsonRegistry[jsonNeeded]);

    return target;
};

const appendToTargetPath = (object, path, value) => {
    const keys = [...path];
    const lastKey = keys.pop();

    const target = keys.reduce((current, key) => current[key], object);
    target[lastKey].push(value);
};

const functionRegistry = {
    fromCollection,
};

const startFunc = () => {
    rowInstuctions.forEach(instruction => {
        const sourcePath = instruction.sourcePath;
        const source = getByPath(sourcePath);
        // console.log("source : ", source);
        const destinationPath = instruction.destinationPath;

        const fromInstruction = functionRegistry[instruction?.func](source, spec[instruction?.templateKey]);

        setByPath(destinationPath, fromInstruction);
    });

    columnInstuctions.forEach(instruction => {
        const sourcePath = instruction.sourcePath;
        const source = getByPath(sourcePath);
        // console.log("source : ", source);
        const destinationPath = instruction.destinationPath;

        const fromInstruction = functionRegistry[instruction?.func](source, spec[instruction?.templateKey]);

        setByPath(destinationPath, fromInstruction);
    });
    // let afterRows = runRowInstuctions(tempTableJson);

    // return afterRows;
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

startFunc();
console.log("last ", JSON.stringify(base, null, 2));


export default startFunc;