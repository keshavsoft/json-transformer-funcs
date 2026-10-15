import oneDimensional from "../oneDimensional/fromCollection/index.js";
import applyTemplate from "../primitive/applyTemplate/index.js";

const addRowData = (inContainerSource, inRowData) => {
    return inContainerSource.map(element => {
        return {
            ...element,
            rowData: inRowData[element.columnName]
        }
    });
};

const startFunc = (inContainerSource, inCellSource, inTemplateContainer, inTemplateCell) => {
    const builtCollectionInsideArray = inCellSource.map(element => {
        let rowSource = addRowData(inContainerSource, element);

        const row = applyTemplate(inTemplateContainer, element);
        const cells = oneDimensional(rowSource, inTemplateCell);
        row.children = cells;
        return row;
    });

    return builtCollectionInsideArray;
};

export default startFunc;