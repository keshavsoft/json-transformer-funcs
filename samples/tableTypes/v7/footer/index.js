import { collectionFromKey } from "../../../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import instructions from "./instuctions.json" with { type: "json" };

let tempTableJson = structuredClone(tableJson);

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

instructions.forEach(instruction => {
    const input = {
        source: sampleData[instruction.sourceKey],
        template: sampleSpec[instruction.templateKey]
    };

    const result = functionRegistry[instruction.func](input);

    setByPath(tempTableJson, instruction.destinationPath, result);
});

// console.log(JSON.stringify(tempTableJson, null, 2));
// console.log("colgroup : ", tempTableJson.children[0].children);
// console.log("head : ", tempTableJson.children[1].children);

// console.log("body : ", tempTableJson.children[2].children);

console.log("footer1 : ", tempTableJson.children[3].children.children[0].children);
console.log("footer2 : ", tempTableJson.children[3].children.children);