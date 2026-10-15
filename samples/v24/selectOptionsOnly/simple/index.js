import {
    fromCollection, resolvePath
} from "../../../../src/v24/index.js";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };
import singleInstructions from "./instructions/single.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import writePath from "./writePath/index.js";

// 1. Keep the input, base structure, and templates together as the build context.
const registry = { data, base, spec };
const functions = {
    fromCollection
};

// 2. Apply each instruction: read source, build result, write destination.
const runInstructions = instructions => {
    instructions.forEach(instruction => {
        const source = resolvePath(registry, instruction.sourcePath);

        if (source) {
            const result = functions[instruction.func](source, spec[instruction.templateKey]);
            writePath(registry, instruction.destinationPath, result);
        } else {
            console.log("   !instruction : ", instruction);
            console.log("   !source : ", source);
        };
    });
};

// 3. Complete and return its JSON specification.
const startFunc = () => {
    runInstructions(singleInstructions);
    return base;
};

const result = startFunc();

console.log("options only : ", JSON.stringify(result.children, null, 2));
