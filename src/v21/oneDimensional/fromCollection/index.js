import applyTemplate from "../../primitive/applyTemplate/index.js";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    return localSource.map(element => applyTemplate(localTemplate, element));
};

export default startFunc;
