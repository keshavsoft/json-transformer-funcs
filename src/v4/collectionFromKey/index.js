import forAttributes from "./forAttributes/index.js";
import getContentKey from "./getContentKey.js";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    const textContentKey = getContentKey(localTemplate?.textContent);

    let loopInsideArray = localSource.map(element => {
        const loopInsideBuild = structuredClone(localTemplate);

        if (textContentKey) loopInsideBuild.textContent = element?.[textContentKey];

        if ("attributes" in loopInsideBuild) {
            const result = forAttributes(loopInsideBuild.attributes, element);
            loopInsideBuild.attributes = result;
        };

        return loopInsideBuild;
    });
    // console.log("forAttributeValues : ", loopInsideArray);

    return loopInsideArray;
};

export default startFunc;