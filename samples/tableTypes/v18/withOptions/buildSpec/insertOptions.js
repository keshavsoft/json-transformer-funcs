import findByRole from "./findByRole.js";

const inColGroup = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    headCell.attributes.width = "100px";
    inTarget.push(headCell);
};

const inHeader = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
    headCell.textContent = "options";
    inTarget.push(headCell);
};

const inBody = (inTarget, inCellSpec) => {
    inTarget.forEach(row => {
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
    inColGroup(findByRole(inTarget, "table-colgroup")?.children, inSpec?.buildColGroup);
    inHeader(findByRole(inTarget, "table-header-row")?.children, inSpec?.buildHeader);
    inBody(findByRole(inTarget, "table-body")?.children, inSpec?.button);
    inFooter(findByRole(inTarget, "table-footer-row")?.children, inSpec?.button);
};

export default startFunc;
