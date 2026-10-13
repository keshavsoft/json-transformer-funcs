import {
    fromCollection, tableBody, buildBody
} from "../../../../../src/index.js";

import insertSerial from "./insertSerial.js";
import insertOptions from "./insertOptions.js";
import findByRole from "./findByRole.js";

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

const setByRolePath = (role, path, value) => {
    const target = findByRole(jsonRegistry.base, role);
    if (!target) throw new Error(`Could not find base target with data-role="${role}"`);

    const keys = [...path];
    const lastKey = keys.pop();
    const parent = keys.reduce((current, key) => current[key], target);
    parent[lastKey] = value;
};

const functionRegistry = {
    fromCollection, tableBody, buildBody
};

const startFunc = (inData) => {
    jsonRegistry.data = inData;
    console.log("inData : ", inData);

    rowInstuctions.forEach(instruction => {
        const sourcePath = instruction.sourcePath;
        const source = getByPath(sourcePath);
        // console.log("source : ", source);
        const fromInstruction = functionRegistry[instruction?.func](source, spec[instruction?.templateKey]);

        setByRolePath(instruction.destinationRole, instruction.destinationPath, fromInstruction);
    });

    columnInstuctions.forEach(instruction => {
        const sourcePath = instruction.sourcePath;
        const source = getByPath(sourcePath);
        // console.log("source : ", source);
        const fromInstruction = functionRegistry[instruction?.func](source, spec[instruction?.templateKey]);

        setByRolePath(instruction.destinationRole, instruction.destinationPath, fromInstruction);
    });
    // let afterRows = runRowInstuctions(tempTableJson);

    buildBody(findByRole(jsonRegistry.base, "table-body").children, inData, jsonRegistry?.spec?.buildBodyCell);

    insertSerial(jsonRegistry?.base, jsonRegistry?.spec);
    insertOptions(jsonRegistry?.base, jsonRegistry?.spec);

    return jsonRegistry.base;
};

export default startFunc;