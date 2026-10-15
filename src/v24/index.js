// 1. Primitive (Common Foundation)
import applyTemplate from "json-transformer-funcs-primitive";

// 2. One-Dimensional (Linear Collection Mapper)
import fromCollection from "json-transformer-funcs-one-dimension";

// 3. Two-Dimensional (Matrix Grid Mapper)
import twoDimensional from "json-transformer-funcs-two-dimensions";

// 4. Tree (DOM / Hierarchy utilities)
import findByRole from "./findByRole.js";
import resolvePath from "./resolvePath.js";

export {
    applyTemplate,
    fromCollection,
    twoDimensional,
    findByRole,
    resolvePath
};
