const startFunc = ({ inKey, inDirective }) => {
    const localKey = inKey;
    const localDirective = inDirective;

    return localDirective?.alterKey || localKey;
};

export default startFunc;
