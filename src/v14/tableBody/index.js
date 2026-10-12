const startFunc = (inSource, inDataAndTemplates) => {
    const newSource = structuredClone(inSource);

    const userData = inDataAndTemplates?.userData;

    const userColumns = userData?.columns;
    const data = userData?.data;

    newSource.forEach((element, loopIndex) => {
        let rowCells = [];

        userColumns.map(element => {
            let bodyCell = structuredClone(inDataAndTemplates?.template);

            bodyCell.textContent = data[loopIndex][element.columnName];

            rowCells.push(bodyCell);
        });

        element.children = rowCells;
    });

    return newSource;
};

export default startFunc;
