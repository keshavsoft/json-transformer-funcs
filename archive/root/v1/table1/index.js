import { collectionFromKey, collectionFromInternal } from "../../src/index.js";

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

instructions.forEach(instruction => {
    let result;

    if (instruction.func === "collectionFromKey") {
        result = collectionFromKey(
            sampleData[instruction.sourceKey],
            sampleSpec[instruction.templateKey]
        );
    } else if (instruction.func === "collectionFromInternal") {
        console.log("source:", sampleData[instruction.sourceKey]);
        console.log("templateKey:", instruction.templateKey);
        console.log("template:", sampleSpec[instruction.templateKey]);

        const template = sampleSpec[instruction.templateKey];

        result = collectionFromInternal(
            sampleData[instruction.sourceKey],
            template.outerTemplate,
            template.innerTemplate
        );
    }

    if (result) {
        setByPath(tempTableJson, instruction.destinationPath, result);
    }
});

console.log(JSON.stringify(tempTableJson, null, 2));