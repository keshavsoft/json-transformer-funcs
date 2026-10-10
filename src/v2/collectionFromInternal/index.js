const startFunc = (inSource, outerTemplate, innerTemplate) => {
    const localSource = inSource;
    const localOuterTemplate = outerTemplate;
    const localInnerTemplate = innerTemplate;

    return localSource.map(element => {
        const loopInsideBuild = structuredClone(localOuterTemplate);

        const loopInsideArray = buildCell({
            inSource: element,
            inTemplate: localInnerTemplate
        });

        loopInsideBuild.children = loopInsideArray;

        return loopInsideBuild;
    });
};

const buildCell = ({ inSource, inTemplate }) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    let loopInsideArray = [];

    for (const [rowKey, rowValue] of Object.entries(localSource)) {
        const loopInsideBuild = structuredClone(localTemplate);
        loopInsideBuild.textContent = loopInsideBuild.textContent.replace("${rowValue}", rowValue).replace("${}", rowValue);

        loopInsideArray.push(loopInsideBuild);
    };
    // console.log("loopInsideArray : ", loopInsideArray);
    return loopInsideArray;
};

export default startFunc;