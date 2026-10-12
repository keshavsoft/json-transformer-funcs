import applyTemplate from "../applyTemplate/index.js";

const startFunc = (inSource, inTemplate) => {
    console.log(": ", inSource, inTemplate);

    const localSource = inSource;
    const localTemplate = inTemplate;

    return localSource.map(element => applyTemplate(localTemplate, element));
};

export default startFunc;
