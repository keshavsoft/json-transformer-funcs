import forAttributes from "./forAttributes/index.js";
import forChildren from "./forChildren/index.js";
import forTextContent from "./forTextContent.js";

const startFunc = (inTemplate, inElement) => {
    const localClonedTemplate = structuredClone(inTemplate);
    console.log("inTemplate : ", inTemplate);

    if ("textContent" in localClonedTemplate) localClonedTemplate.textContent = forTextContent(localClonedTemplate?.forTextContent, inElement);

    if ("attributes" in localClonedTemplate) {
        localClonedTemplate.attributes = forAttributes(localClonedTemplate?.attributes, inElement);
    };

    if ("children" in localClonedTemplate) localClonedTemplate.children = forChildren(localClonedTemplate?.children, inElement);

    return localClonedTemplate;
};

export default startFunc;