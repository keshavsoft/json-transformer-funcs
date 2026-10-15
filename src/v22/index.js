// 1. Primitive (Single node template interpolation)
import applyTemplate from "./primitive/applyTemplate/index.js";

// 2. One-Dimensional (1D Collection mapping: cols, headers, footers)
import fromCollection from "./oneDimensional/fromCollection/index.js";

// 3. Two-Dimensional (2D Matrix: Table body rows & cells)
import buildBody from "./twoDimensional/buildBody/index.js";
import tableBody from "./twoDimensional/tableBody/index.js";

// 4. Tree (DOM / Hierarchy utilities)
import findByRole from "./tree/findByRole/index.js";
import resolvePath from "./tree/resolvePath/index.js";

// Declarative Aliases
const buildRowCells = tableBody;
const buildTableRows = buildBody;

export {
    // 1. Primitive
    applyTemplate,

    // 2. One-Dimensional
    fromCollection,

    // 3. Two-Dimensional
    buildBody,
    tableBody,
    buildTableRows,
    buildRowCells,

    // 4. Tree
    findByRole,
    resolvePath
};