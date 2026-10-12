import applyTemplate from "../applyTemplate/index.js";

const buildCell = (inSource, inTemplate) =>
    Object.values(inSource).map(value => applyTemplate(inTemplate, { rowValue: value }));

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;

    return localSource.map(element => {
        const cell = buildCell(element, inTemplate);

        return cell;
    });
};

export default startFunc;
