import applyTemplate from "../applyTemplate/index.js";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    // console.log("------- : ", localSource, inTemplate);

    return localSource.map(element => applyTemplate(localTemplate, element));
};

export default startFunc;
