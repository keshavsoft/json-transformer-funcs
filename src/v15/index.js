import collectionFromKey from "./collectionFromKey/index.js";
import collectionFromInternal from "./collectionFromInternal/index.js";
import collectionFromArray from "./collectionFromArray/index.js";
import collectionToCollection from "./collectionToCollection/index.js";
import applyTemplate from "./applyTemplate/index.js";
import tableBody from "./tableBody/index.js";

import tableFromData, { defaultSpec, defaultTable } from "./tableFromData/index.js";

export {
    collectionFromKey, collectionFromInternal, collectionFromArray,
    collectionToCollection, tableFromData, tableFromData as buildTable,
    applyTemplate, tableBody, defaultSpec, defaultTable
};

export default tableFromData;