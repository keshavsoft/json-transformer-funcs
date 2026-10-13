const inColGroup = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    // headCell.textContent = "#";
    headCell.attributes.width = "50px";

    inTarget.unshift(headCell);
};

const inHeader = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    headCell.textContent = "#";

    inTarget.unshift(headCell);
};

const inBody = (inTarget, inCellSpec) => {
    inTarget.forEach((row, rowIndex) => {
        const serialCell = structuredClone(inCellSpec);
        serialCell.textContent = rowIndex + 1;
        row.children.unshift(serialCell);
    });
};

const inFooter = (inTarget, inHeaderSpec) => {
    const footCell = structuredClone(inHeaderSpec);
    delete footCell.children;

    inTarget.unshift(footCell);
};

const startFunc = (inTarget, inSpec) => {
    inColGroup(inTarget?.children[0].children, inSpec?.buildColGroup);
    inHeader(inTarget?.children[1].children[0].children, inSpec?.buildHeader);
    inBody(inTarget?.children[2].children, inSpec?.buildBodyCell);
    inFooter(inTarget?.children[3].children[0].children, inSpec?.buildFooter);
};

export default startFunc;