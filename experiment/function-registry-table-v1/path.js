const getByPath = (object, path) => {
    return path.split(".").filter(Boolean).reduce((current, key) => {
        if (current === null || current === undefined) return undefined;
        return current[key];
    }, object);
};

const setByPath = (object, path, value) => {
    const keys = path.split(".").filter(Boolean);
    if (keys.length === 0) throw new Error("Target path cannot be empty");

    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (current === null || current === undefined || !(key in current)) {
            throw new Error(`Target path does not exist: ${path}`);
        }
        return current[key];
    }, object);

    if (target === null || target === undefined) {
        throw new Error(`Target parent does not exist: ${path}`);
    }
    target[lastKey] = value;
    return object;
};

export { getByPath, setByPath };
