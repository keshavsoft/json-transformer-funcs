import collectionFromKey from "../../src/v5/collectionFromKey/index.js";
import collectionFromInternal from "../../src/v5/collectionFromInternal/index.js";

// The registry exposes only functions we deliberately allow instructions to call.
const functionRegistry = {
    collectionFromKey,
    collectionFromInternal
};

const resolveFunction = (name) => {
    const fn = functionRegistry[name];
    if (typeof fn !== "function") {
        throw new Error(`Unknown registered function: ${name}`);
    }
    return fn;
};

export { functionRegistry, resolveFunction };
export default functionRegistry;
