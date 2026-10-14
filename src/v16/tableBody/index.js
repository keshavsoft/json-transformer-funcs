//here we loop through the incolumns collection and for each column create a cell
// in the resulting object
// and then return the rowCells collection
const startFunc = (inTemplate, inRowData, inColumns) => {
    const localColumns = inColumns;
    const localRowData = inRowData;

    let rowCells = [];

    localColumns.forEach(element => {
        let bodyCell = structuredClone(inTemplate);

        bodyCell.textContent = localRowData[element.columnName];

        rowCells.push(bodyCell);
    });

    return rowCells;
};

export default startFunc;