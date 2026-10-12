const startFunc = ({ inValue, inDirective }) => {
    const localValue = inValue;
    const localDirective = inDirective;

    if (localDirective?.valueKey && localValue && typeof localValue === "object") {
        return localValue[localDirective.valueKey];
    }

    return localValue;
};

export default startFunc;
