const keyName = "buildArray";

const buildRow = ({ inSource, inTemplate }) => {
    const localSource = inSource;

    let loopInsideArray = localSource.map(element => {
        const loopInsideBuild = structuredClone(inTemplate);
        loopInsideBuild.textContent = element?.columnName;

        return loopInsideBuild;
    });

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
            inTemplate: value?.cell
        });
        localSource[key] = value?.row;

        localSource[key].children = loopInsideArray;
    };

    return localSource;
};

export default startFunc;
