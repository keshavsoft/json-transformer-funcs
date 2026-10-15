import tableBody from "../tableBody/index.js";

/**
 * Hydrates an existing collection of hollow <tr> rows by generating and injecting
 * cell nodes for each row using tableBody.
 * 
 * @param {Array} inTarget - The pre-created hollow <tr> rows in tbody.
 * @param {Object} inData - The input object containing { data: rowRecords[], columns: columnDefs[] }.
 * @param {Object} inCellSpec - The template specification catalog (spec.json).
 */
const startFunc = (inTarget, inData, inCellSpec) => {
    inTarget.forEach((loopRow, loopIndex) => {
        const row = inData?.data[loopIndex];
        const bodyRow = tableBody(inCellSpec, row, inData?.columns);
        loopRow.children = bodyRow;
    });
};

export default startFunc;