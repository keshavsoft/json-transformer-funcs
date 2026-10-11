import forAttributes from "./collectionFromKey/forAttributes/index.js";
import getContentKey from "./collectionFromKey/getContentKey.js";

const applyTemplate = (inTemplate, inElement) => {
    const loopInsideBuild = structuredClone(inTemplate);

    const textContentKey = getContentKey(inTemplate?.textContent);
    if (textContentKey) loopInsideBuild.textContent = inElement?.[textContentKey];

    if ("attributes" in loopInsideBuild) {
        loopInsideBuild.attributes = forAttributes(loopInsideBuild.attributes, inElement);
    };

    return loopInsideBuild;
};

export default applyTemplate;
