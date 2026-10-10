import ifTransformFound from "./ifTransformFound/index.js";
import ifOperationFound from "./ifOperationFound/index.js";
import ifBuildFound from "./ifBuildFound/index.js";
import ifBuildCollectionFound from "./ifBuildCollectionFound/index.js";
import ifBuildArrayFound from "./ifBuildArrayFound/index.js";
import ifBuildBodyFound from "./ifBuildBodyFound/index.js";
import objectToArray from "./objectToArray/index.js";
import ifSpecFound from "./ifSpecFound/index.js";

const showLogs = false;

const startFunc = ({ inSource, inRecipe }) => {
    let localSource = inSource;
    const localRecipe = inRecipe;

    // console.log("start : ", inSource, inRecipe);

    if (showLogs) {
        console.log("execution", localSource, localRecipe);
    }

    if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
        const fromTransform = ifTransformFound({
            inSource: localSource,
            inTransform: localRecipe.transform,
            inExecute: startFunc
        });

        localSource = fromTransform;
    };

    if (localRecipe && typeof localRecipe === "object" && "operation" in localRecipe) {
        const fromOperation = ifOperationFound({
            inSource: localSource,
            inOperation: localRecipe.operation,
            inExecute: startFunc
        });

        localSource = fromOperation;
    };

    if (localRecipe && typeof localRecipe === "object" && "build" in localRecipe) {
        const fromOperation = ifBuildFound({
            inSource: localSource,
            inBuild: localRecipe?.build,
            inExecute: startFunc
        });

        localSource = fromOperation;
    };

    if (localRecipe && typeof localRecipe === "object" && "buildCollection" in localRecipe) {
        const fromBuildCollection = ifBuildCollectionFound({
            inSource: localSource,
            inBuild: localRecipe?.buildCollection,
            inExecute: startFunc
        });
        // console.log("fromBuildCollection : ", fromBuildCollection);
        localSource = fromBuildCollection;
    };

    if (localRecipe && typeof localRecipe === "object" && "buildArray" in localRecipe) {
        const fromBuildCollection = ifBuildArrayFound({
            inSource: localSource,
            inBuild: localRecipe?.buildArray,
            inExecute: startFunc
        });
        // console.log("fromBuildCollection : ", fromBuildCollection);
        localSource = fromBuildCollection;
    };

    if (localRecipe && typeof localRecipe === "object" && "buildBody" in localRecipe) {
        const fromBuildCollection = ifBuildBodyFound({
            inSource: localSource,
            inBuild: localRecipe?.buildBody,
            inExecute: startFunc
        });
        // console.log("fromBuildCollection : ", fromBuildCollection);
        localSource = fromBuildCollection;
    };

    if (localRecipe && typeof localRecipe === "object" && "objectToArray" in localRecipe) {
        const fromBuildCollection = objectToArray({
            inSource: localSource,
            inBuild: localRecipe?.objectToArray,
            inExecute: startFunc
        });
        // console.log("fromBuildCollection : ", fromBuildCollection);
        localSource = fromBuildCollection;
    };

    if (localRecipe && typeof localRecipe === "object" && "spec" in localRecipe) {
        const fromSpec = ifSpecFound({
            inSource: localSource,
            inTransform: localRecipe?.spec,
            inExecute: startFunc
        });
        // console.log("fromBuildCollection : ", fromBuildCollection);
        localSource = fromSpec;
    };

    return localSource;
};

export default startFunc;
