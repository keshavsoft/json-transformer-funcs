import { resolveFunction } from "./functionRegistry.js";
import { getByPath, setByPath } from "./path.js";

// Executes instructions without knowing that the target structure is a table.
// Each instruction supplies: sourcePath, function, dataPath, and templatePath.
const executeInstructions = ({ spec, instructions, data, templates }) => {
    const completedSpec = structuredClone(spec);

    for (const instruction of instructions) {
        const { sourcePath, function: functionName, dataPath, templatePath } = instruction;
        const fn = resolveFunction(functionName);
        const inputData = getByPath(data, dataPath);
        const template = getByPath(templates, templatePath);

        if (inputData === undefined) {
            throw new Error(`Data path not found: ${dataPath}`);
        }
        if (template === undefined) {
            throw new Error(`Template path not found: ${templatePath}`);
        }

        let output;
        switch (functionName) {
            case "collectionFromKey":
                output = fn(inputData, template);
                break;
            case "collectionFromInternal":
                output = fn(inputData, template.outerTemplate, template.innerTemplate);
                break;
            default:
                throw new Error(`No argument adapter defined for registered function: ${functionName}`);
        }

        setByPath(completedSpec, sourcePath, output);
    }

    return completedSpec;
};

export default executeInstructions;
