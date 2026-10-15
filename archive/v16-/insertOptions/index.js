const inColGroup = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    // headCell.textContent = "#";
    headCell.attributes.width = "100px";

    inTarget.push(headCell);
};

const inHeader = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    headCell.textContent = "options";

    inTarget.push(headCell);
};

const inBody = (inTarget, inCellSpec) => {
    inTarget.forEach((row, rowIndex) => {
        const buttonCell = structuredClone(inCellSpec);
        buttonCell.textContent = "show";
        row.children.push(buttonCell);
    });
};

const inFooter = (inTarget, inHeaderSpec) => {
    const buttonCell = structuredClone(inHeaderSpec);
    buttonCell.textContent = "save";
    inTarget.push(buttonCell);
};

const startFunc = (inTarget, inSpec) => {
    inColGroup(inTarget?.children[0].children, inSpec?.buildColGroup);
    inHeader(inTarget?.children[1].children[0].children, inSpec?.buildHeader);
    inBody(inTarget?.children[2].children, inSpec?.button);
    inFooter(inTarget?.children[3].children[0].children, inSpec?.button);
};

export default startFunc;