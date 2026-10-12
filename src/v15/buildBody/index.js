import tableBody from "../tableBody/index.js";

const startFunc = (inTarget, inData, inCellSpec) => {
    inTarget.forEach((loopRow, loopIndex) => {
        const row = inData?.data[loopIndex];
        const bodyRow = tableBody(inCellSpec, row, inData?.columns);
        loopRow.children = bodyRow;
    });
};

export default startFunc;