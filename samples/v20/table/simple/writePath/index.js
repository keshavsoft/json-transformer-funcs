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
    },
    pushToRows: (parent, key, value) => {
        parent[key].forEach(row => {
            row.children.push(...structuredClone(toArray(value)));
        });
    },
    unshiftToRows: (parent, key, value) => {
        parent[key].forEach(row => {
            row.children.unshift(...structuredClone(toArray(value)));
        });
    },
    unshiftSerialToRows: (parent, key, value) => {
        parent[key].forEach((row, rowIndex) => {
            const item = structuredClone(value);
            item.textContent = rowIndex + 1;
            row.children.unshift(item);
        });
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
