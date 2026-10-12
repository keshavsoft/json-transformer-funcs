const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;
    const localKey = localTemplate?.textContent?.replace("${", "").replace("}", "");

    let loopInsideArray = localSource.map(element => {
        const loopInsideBuild = structuredClone(localTemplate);
        loopInsideBuild.textContent = element?.[localKey];

        return loopInsideBuild;
    });

    return loopInsideArray;
};


export default startFunc;