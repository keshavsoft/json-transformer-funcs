import forAttributes from "./forAttributes/index.js";
import forChildren from "./forChildren/index.js";
import forTextContent from "./forTextContent.js";

const startFunc = (inTemplate, inElement) => {
    const localClonedTemplate = structuredClone(inTemplate);
    // console.log("inTemplate : ", inTemplate, typeof localClonedTemplate);

    if (typeof localClonedTemplate === "string") return localClonedTemplate;
    if (localClonedTemplate === null || typeof localClonedTemplate !== "object") return localClonedTemplate;
    // console.log("1111111 : ", inTemplate, typeof localClonedTemplate);
    if ("textContent" in localClonedTemplate) localClonedTemplate.textContent = forTextContent(localClonedTemplate?.textContent, inElement);

    if ("attributes" in localClonedTemplate) {
        localClonedTemplate.attributes = forAttributes(localClonedTemplate?.attributes, inElement);
    };

    if ("children" in localClonedTemplate) localClonedTemplate.children = forChildren(localClonedTemplate?.children, inElement);

    return localClonedTemplate;
};

export default startFunc;