const clone = value => structuredClone(value);

const findChild = (node, tagName) =>
    node.children?.find(child => child.tagName === tagName);

const requireChild = (node, tagName) => {
    const child = findChild(node, tagName);

    if (!child) {
        throw new Error(`Table is missing <${tagName}>`);
    }

    return child;
};

const getBodyRows = table => requireChild(table, "tbody").children ?? [];

const createCell = (template, value) => {
    const cell = clone(template);

    if (value !== undefined && value !== null) {
        cell.textContent = String(value);
    }

    return cell;
};

const appendColumn = ({
    table,
    column,
    rows,
    templates
}) => {
    requireChild(table, "colgroup").children.push(
        createCell(templates.col, column.width)
    );

    requireChild(table, "thead").children[0].children.push(
        createCell(templates.header, column.columnName)
    );

    getBodyRows(table).forEach((row, index) => {
        const value = rows[index]?.[column.key];

        row.children.push(
            createCell(templates.body, value)
        );
    });

    requireChild(table, "tfoot").children[0].children.push(
        createCell(templates.footer, column.columnName)
    );

    return table;
};

const addColumns = ({
    table,
    columns = [],
    rows = [],
    templates
}) => {
    columns.forEach(column =>
        appendColumn({
            table,
            column,
            rows,
            templates
        })
    );

    return table;
};

export { appendColumn };
export default addColumns;
