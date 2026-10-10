import traverse from "../index.js";

const startFunc = ({ inItems, inRecipe, inExecute }) => {
    const localItems = inItems;
    const localRecipe = inRecipe;
    const localExecute = inExecute;

    return localItems
        .map((item) => traverse({
            inSource: item,
            inRecipe: localRecipe,
            inExecute: localExecute
        }))
        .flat(Infinity)
        .filter(Boolean);
};

export default startFunc;
