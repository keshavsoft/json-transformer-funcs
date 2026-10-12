const startFunc = (inTextContent, inElement) => {
    return inTextContent.replace(/\$\{(\w+)\}/g, (match, key) => {
        return inElement[key] !== undefined ? inElement[key] : match;
    });

    return inTextContent;
};

export default startFunc;