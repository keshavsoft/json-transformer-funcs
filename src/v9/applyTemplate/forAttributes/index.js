import getContentKey from "../getContentKey.js";

const startFunc = (inAttributes, inSource) => {
    let newObject = {};

    for (const [key, value] of Object.entries(inAttributes)) {
        newObject[key] = value;

        const textContentKey = getContentKey(value);

        if (textContentKey) {
            if (textContentKey in inSource) {
                newObject[key] = inSource?.[textContentKey];
            };
        };
    };

    return newObject;
};

export default startFunc;