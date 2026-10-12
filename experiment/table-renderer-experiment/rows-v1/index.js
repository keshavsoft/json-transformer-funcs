const buildRows = (rows = []) =>
    rows.map(() => ({
        tagName: "tr",
        attributes: {
            class: "align-middle"
        },
        children: []
    }));

export default buildRows;
