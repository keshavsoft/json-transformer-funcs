const startFunc = (inStringTemplate, inElement) => {
    return inStringTemplate.replace(/\$\{(\w+)\}/g, (match, key) => {
        return inElement[key] !== undefined ? inElement[key] : match;
    });
};

export default startFunc;