import traverse from "../../../traversal/index.js";

const startFunc = ({ inValue, inDirective, inExecute }) => {
    const localValue = inValue;
    const localDirective = inDirective;
    const localExecute = inExecute;

    if (localDirective && "transform" in localDirective) {
        return traverse({
            inSource: localValue,
            inRecipe: localDirective,
            inExecute: localExecute
        });
    }

    return localValue;
};

export default startFunc;
