import resolveKey from "./resolveKey/index.js";
import applyTransform from "./applyTransform/index.js";
import normalizeValueType from "./normalizeValueType/index.js";
import extractValueKey from "./extractValueKey/index.js";

const startFunc = ({ inSource, inTransform, inExecute }) => {
    const localSource = inSource;
    const localTransform = inTransform;
    const localExecute = inExecute;

    const newElement = {};

    for (const [key, value] of Object.entries(localSource)) {
        if (!(key in localTransform)) {
            continue;
        }

        const directive = localTransform[key];
        const newKey = resolveKey({ inKey: key, inDirective: directive });

        let processedValue = value;
        processedValue = applyTransform({
            inValue: processedValue,
            inDirective: directive,
            inExecute: localExecute
        });
        processedValue = normalizeValueType({ inValue: processedValue, inDirective: directive });
        processedValue = extractValueKey({ inValue: processedValue, inDirective: directive });

        newElement[newKey] = processedValue;
    };

    return newElement;
};

export default startFunc;
