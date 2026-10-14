import tableBody from "../tableBody/index.js";

// here inTarget is an already built collection with children empty, 
// so we will loop that and appand new collection built from inCellSpec, 
// by pulling the actual values from inData, where in the rows of intarget match inData.data rows
// in inCellSpec we define the template for the row, i.e. how many rows inTarget it will be, and for each row, how many columns it will be.
const startFunc = (inTarget, inData, inCellSpec) => {
    inTarget.forEach((loopRow, loopIndex) => {
        const row = inData?.data[loopIndex];
        const bodyRow = tableBody(inCellSpec, row, inData?.columns);
        loopRow.children = bodyRow;
    });
};

export default startFunc;