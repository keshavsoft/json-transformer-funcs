import findByRole from "./findByRole.js";

const inColGroup = (inTarget, inHeaderSpec) => {
    const headCell = structuredClone(inHeaderSpec);
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
    inColGroup(findByRole(inTarget, "table-colgroup")?.children, inSpec?.buildColGroup);
    inHeader(findByRole(inTarget, "table-header-row")?.children, inSpec?.buildHeader);
    inBody(findByRole(inTarget, "table-body")?.children, inSpec?.buildBodyCell);
    inFooter(findByRole(inTarget, "table-footer-row")?.children, inSpec?.buildFooter);
};

export default startFunc;
