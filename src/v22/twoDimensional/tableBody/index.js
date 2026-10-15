import applyTemplate from "../../primitive/applyTemplate/index.js";

/**
 * Builds the cells (<td>) for a single table row across all configured columns.
 * 
 * @param {Object} inTemplate - The template specification catalog (spec.json).
 * @param {Object} inRowData - The data record for this specific row.
 * @param {Array} inColumns - The column definitions configuring width, template, and columnName.
 * @returns {Array} Array of populated cell nodes for the row.
 */
const startFunc = (inTemplate, inRowData, inColumns) => {
    const localColumns = inColumns;
    const localRowData = inRowData;

    let rowCells = [];

    localColumns.forEach(element => {
        const loopInsideSpec = inTemplate[element?.template?.bodyCell];

        if (loopInsideSpec) {
            // Attach the current row's field value so applyTemplate can resolve ${rowValue} or ${agg:count}
            element.rowData = localRowData[element.columnName];

            const bodyCell = applyTemplate(loopInsideSpec, element);
            rowCells.push(bodyCell);
        }
    });

    return rowCells;
};

export default startFunc;