import traverseArray from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

const showLogs = false;

const startFunc = ({ inSource, inRecipe, inExecute }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;
    const localExecute = inExecute;

    if (showLogs) {
        console.log("traversal", localSource, localRecipe, localExecute);
    };

    if (Array.isArray(localSource)) {
        return traverseArray({
            inItems: localSource,
            inRecipe: localRecipe,
            inExecute: localExecute
        });
    }

    if (typeof localSource === "object" && localSource !== null) {
        return traverseObject({
            inSource: localSource,
            inRecipe: localRecipe,
            inExecute: localExecute
        });
    }

    return localSource;
};

export default startFunc;
