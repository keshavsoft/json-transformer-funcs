const showLogs = false;

function modifyNestedObject(obj, valueToChange) {
    for (const key in obj) {
        // 1. Check if the value is a nested object (and not null)
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            modifyNestedObject(obj[key], valueToChange); // Recursively dive deeper
        } else {
            // 2. Apply your "if condition" to leaf values
            if (typeof obj[key] === 'string' && obj[key] === "${}") {
                obj[key] = valueToChange;
            };
        };
    };

    return obj;
}

const startFunc = ({ inSource, inOperation, inExecute }) => {
    const localSource = inSource;
    const localOperation = inOperation;
    const localExecute = inExecute;

    if (showLogs) {
        console.log("ifOperationFound : ", localSource, localOperation, localExecute);
    };

    for (const [key, value] of Object.entries(localOperation)) {
        if ("operationType" in value) {
            if (value.operationType === "loopArray") {
                if (key in localSource) {
                    // localSource[key] = "charan";

                    const newArray = localSource[key].map(element => {
                        const loopInsideNewObject = structuredClone(value?.template);

                        modifyNestedObject(loopInsideNewObject, element);

                        return loopInsideNewObject;
                    });

                    localSource[key] = newArray;
                };
            };
        };
    };

    return localSource;
};

export default startFunc;
