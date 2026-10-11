import forAttributes from "./forAttributes/index.js";
import getContentKey from "./getContentKey.js";

const forAttributeValues = ({ inElement, inAttributes }) => {
    let newObject = {};

    for (const [rowKey, rowValue] of Object.entries(inAttributes)) {
        console.log("rowValue : ", rowValue);
        newObject[rowKey] = "aaaa";
    };

    return newObject;
};

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

const forTextContent = (inTextContent) => {
    let localTextContent = inTextContent;

    if (localTextContent.startsWith("$")) {
        return localTextContent?.replace("${", "").replace("}", "");
    };
};

const startFunc2 = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    let loopInsideArray = localSource.map(element => {
        const loopInsideBuild = structuredClone(localTemplate);

        if ("textContent" in localTemplate) {
            loopInsideBuild.textContent = forTextContent({
                inElement: element,
                inTextContent: localTemplate?.textContent
            });

        };

        if ("attributes" in localTemplate) {
            const att = forAttributeValues({
                inElement: element,
                inAttributes: localTemplate?.attributes
            });
            console.log("att : ", att);
        };

        return loopInsideBuild;
    });
    // console.log("forAttributeValues : ", loopInsideArray);

    return loopInsideArray;
};

const startFunc1 = (inSource, inTemplate) => {
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