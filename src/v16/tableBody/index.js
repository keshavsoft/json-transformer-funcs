const startFunc = (inTemplate, inRowData, inColumns) => {
    const userColumns = inColumns;
    const localRowData = inRowData;

    let rowCells = [];

    userColumns.map(element => {
        let bodyCell = structuredClone(inTemplate);

        bodyCell.textContent = localRowData[element.columnName];

        rowCells.push(bodyCell);
    });

    return rowCells;
};

export default startFunc;