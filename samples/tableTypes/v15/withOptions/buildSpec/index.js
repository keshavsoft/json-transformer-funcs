import {
    fromCollection, tableBody, buildBody
} from "../../../../../src/index.js";

// import data from "./data.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };
import base from "./base.json" with { type: "json" };
import columnInstuctions from "./columnInstuctions.json" with { type: "json" };
import rowInstuctions from "./rowInstuctions.json" with { type: "json" };

const jsonRegistry = {
    data: "",
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

const functionRegistry = {
    fromCollection, tableBody, buildBody
};

const buildBody1 = (inTarget, inData, inCellSpec) => {
    inTarget.forEach((loopRow, loopIndex) => {
        const row = inData?.data[loopIndex];
        const bodyRow = functionRegistry?.tableBody(inCellSpec, row, inData?.columns);
        loopRow.children = bodyRow;
    });
};

const startFunc = (inData) => {
    jsonRegistry.data = inData;
    console.log("inData : ", inData);

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

    buildBody(jsonRegistry.base.children[2].children, inData, jsonRegistry?.spec?.buildBodyCell);

    return jsonRegistry.base;
};

// startFunc();
// console.log("last ", JSON.stringify(base, null, 2));


export default startFunc;