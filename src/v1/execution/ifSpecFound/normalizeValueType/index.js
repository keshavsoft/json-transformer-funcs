const startFunc = ({ inValue, inDirective }) => {
    const localValue = inValue;
    const localDirective = inDirective;

    if (localDirective?.valueType === "array" && !Array.isArray(localValue)) {
        return [localValue];
    }

    return localValue;
};

export default startFunc;
