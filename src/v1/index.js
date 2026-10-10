import traverse from "./traversal/index.js";
import execute from "./execution/index.js";

const transform = (source, recipe) => {
    const localSource = source;
    const localRecipe = recipe;

    return traverse({
        inSource: localSource,
        inRecipe: localRecipe,
        inExecute: execute
    });
};

export { transform, traverse, execute };
export default transform;
