const keyName = "buildCollection";

const buildRow = ({ inSource, inTemplate }) => {
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
    // console.log("aaaaaaaaa : ", localSource, localBuild);

    for (const [key, value] of Object.entries(localBuild)) {
        const loopInsideArray = buildRow({
            inSource: localSource[key],
            inTemplate: value
        });

        localSource[key] = loopInsideArray;
    };

    return localSource;
};

export default startFunc;
