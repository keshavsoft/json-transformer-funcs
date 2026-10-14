//here we loop through the incolumns collection and for each column create a cell
// in the resulting object
// and then return the rowCells collection
//here now we have changed this inTemplate as full templatejson, and keys will be pulled from incolumns
//still planning to complete drive from columns only at all places
const startFunc = (inTemplate, inRowData, inColumns) => {
    const localColumns = inColumns;
    const localRowData = inRowData;
    // console.log("inTemplate : ", inTemplate);

    let rowCells = [];

    localColumns.forEach(element => {
        const loopInsideSpec = inTemplate[element?.template?.bodyCell];

        if (loopInsideSpec) {
            let bodyCell = structuredClone(loopInsideSpec);
            console.log("bodyCell-------- : ", bodyCell);

            if ("textContent" in bodyCell) {
                bodyCell.textContent = localRowData[element.columnName];
            };

            rowCells.push(bodyCell);
        };
    });

    return rowCells;
};

export default startFunc;