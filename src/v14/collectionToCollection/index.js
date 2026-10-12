const startFunc = (inSource, inDataAndTemplates) => {
    // console.log("inSource, inDataAndTemplates : ", inSource, inDataAndTemplates);

    const localSource = inSource;

    const userData = inDataAndTemplates?.userData;

    const userColumns = userData?.columns;
    const data = userData?.data;

    localSource.forEach((element, loopIndex) => {
        let rowCells = [];

        userColumns.map(element => {
            let bodyCell = structuredClone(inDataAndTemplates?.template);

            bodyCell.textContent = data[loopIndex][element.columnName];

            rowCells.push(bodyCell);
        });

        element.children = rowCells;
    });
};

export default startFunc;
