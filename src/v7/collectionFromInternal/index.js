import applyTemplate from "../applyTemplate/index.js";

const buildCell = (inSource, inTemplate) =>
    Object.values(inSource).map(value => applyTemplate(inTemplate, { rowValue: value }));

const startFunc = (inSource, outerTemplate, innerTemplate) => {
    const localSource = inSource;
    const localOuterTemplate = outerTemplate;
    const localInnerTemplate = innerTemplate;

    return localSource.map(element => {
        const loopInsideBuild = structuredClone(localOuterTemplate);
        loopInsideBuild.children = buildCell(element, localInnerTemplate);
        return loopInsideBuild;
    });
};

export default startFunc;
