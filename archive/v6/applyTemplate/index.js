import forAttributes from "./forAttributes/index.js";
import getContentKey from "./getContentKey.js";

const startFunc = (inTemplate, inElement) => {
    const loopInsideBuild = structuredClone(inTemplate);

    const textContentKey = getContentKey(inTemplate?.textContent);
    if (textContentKey) loopInsideBuild.textContent = inElement?.[textContentKey];

    if ("attributes" in loopInsideBuild) {
        loopInsideBuild.attributes = forAttributes(loopInsideBuild.attributes, inElement);
    };

    return loopInsideBuild;
};

export default startFunc;
