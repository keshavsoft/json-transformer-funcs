import traverseArray from "../traverseArray/index.js";

const startFunc = ({ inSource, inRecipe, inExecute }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;
    const localExecute = inExecute;

    let newElement = localSource;

    if (typeof localExecute === "function") {
        newElement = localExecute({
            inSource: localSource,
            inRecipe: localRecipe
        });
    }

    for (const [key, value] of Object.entries(newElement)) {
        if (Array.isArray(value) && localRecipe && key in localRecipe) {
            newElement[key] = traverseArray({
                inItems: value,
                inRecipe: localRecipe[key],
                inExecute: localExecute
            });
        }
    }

    return newElement;
};

export default startFunc;
