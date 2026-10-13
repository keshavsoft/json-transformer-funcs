import { fromCollection, tableBody, buildBody } from "../../../../../src/index.js";
import insertSerial from "./insertSerial.js";
import insertOptions from "./insertOptions.js";
import findByRole from "./findByRole.js";
import resolvePath from "./resolvePath.js";
import spec from "./spec.json" with { type: "json" };
import base from "./base.json" with { type: "json" };
import columnInstructions from "./columnInstuctions.json" with { type: "json" };
import rowInstructions from "./rowInstuctions.json" with { type: "json" };

const jsonRegistry = { data: {}, base, spec };
const functionRegistry = { fromCollection, tableBody, buildBody };

const setAtPath = (registry, path, value) => {
    const target = path.dataRole
        ? findByRole(registry[path.fileName], path.dataRole)
        : registry[path.fileName];
    const keys = [...(path.filePath ?? [])];
    const lastKey = keys.pop();
    const parent = keys.reduce((current, key) => current[key], target);
    parent[lastKey] = value;
};

const runInstructions = (instructions) => {
    instructions.forEach(instruction => {
        const source = resolvePath(jsonRegistry, instruction.sourcePath);
        const result = functionRegistry[instruction.func](source, spec[instruction.templateKey]);
        setAtPath(jsonRegistry, instruction.destinationPath, result);
    });
};

const startFunc = (inData) => {
    jsonRegistry.data = inData;

    runInstructions(rowInstructions);
    runInstructions(columnInstructions);

    buildBody(findByRole(base, "table-body").children, inData, spec.buildBodyCell);
    insertSerial(base, spec);
    insertOptions(base, spec);

    return base;
};

export default startFunc;
