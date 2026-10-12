const keyName = "buildCollection";

const buildRow = ({ inSource, inTemplate }) => {
    const localSource = inSource;

    return localSource.map(element => {
        const loopInsideBuild = structuredClone(inTemplate?.row);

        const loopInsideArray = buildCell({
            inSource: element,
            inTemplate: inTemplate?.cell
        });

        loopInsideBuild.children = loopInsideArray;

        return loopInsideBuild;
    });
};

const buildCell = ({ inSource, inTemplate }) => {
    const localSource = inSource;

    // console.log("localBuildObject : ", localSource, inTemplate);

    let loopInsideArray = [];

    for (const [rowKey, rowValue] of Object.entries(localSource)) {
        const loopInsideBuild = structuredClone(inTemplate);
        loopInsideBuild.textContent = rowValue;

        loopInsideArray.push(loopInsideBuild);
    };
    // console.log("loopInsideArray : ", loopInsideArray);
    return loopInsideArray;
};

const startFunc = ({ inSource, inBuild, inExecute }) => {
    const localSource = structuredClone(inSource);
    const localBuild = structuredClone(inBuild);
    const localExecute = inExecute;

    for (const [key, value] of Object.entries(localBuild)) {
        const loopInsideArray = buildRow({
            inSource: localSource[key],
            inTemplate: value
        });

        localSource[key] = value?.body;

        localSource[key].children = loopInsideArray;
    };

    return localSource;
};

export default startFunc;
