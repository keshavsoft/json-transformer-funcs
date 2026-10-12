const startFunc = (inSource, inDataAndTemplates) => {
    const localSource = inSource;

    const userData = inDataAndTemplates?.userData;

    const userColumns = userData?.columns;
    const data = userData?.data;

    const bodyWithCells = localSource.map((element, loopIndex) => {
        let rowCells = [];

        userColumns.map(element => {
            let bodyCell = structuredClone(inDataAndTemplates?.template);

            bodyCell.textContent = data[loopIndex][element.columnName];

            rowCells.push(bodyCell);
        });

        return {
            ...element,
            children: rowCells
        };
    });

    return bodyWithCells;
};

export default startFunc;
