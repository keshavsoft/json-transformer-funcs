import collectionFromKey from "./collectionFromKey/index.js";
import collectionFromInternal from "./collectionFromInternal/index.js";
import tableFromData, { defaultSpec, defaultTable } from "./tableFromData/index.js";

export { collectionFromKey, collectionFromInternal, tableFromData, tableFromData as buildTable, defaultSpec, defaultTable };
export default tableFromData;
