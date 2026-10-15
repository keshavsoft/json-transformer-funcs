import { findByRole } from "json-transformer-funcs";

const toArray = val => (Array.isArray(val) ? val : [val]);

const actions = {
    set: (parent, key, value) => {
        parent[key] = value;
    },
    push: (parent, key, value) => {
        parent[key].push(...toArray(value));
    },
    unshift: (parent, key, value) => {
        parent[key].unshift(...toArray(value));
    }
};

const writePath = (registry, path, value) => {
    const root = path.dataRole
        ? findByRole(registry[path.fileName], path.dataRole)
        : registry[path.fileName];

    const keys = [...(path.filePath ?? [])];
    const lastKey = keys.pop();
    const parent = keys.reduce((current, key) => current[key], root);

    const actionHandler = actions[path.action] || actions.set;
    actionHandler(parent, lastKey, value);
};

export default writePath;
