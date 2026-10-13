import findByRole from "./findByRole.js";

const resolvePath = (registry, path) => {
    const source = registry[path.fileName];
    const target = path.dataRole ? findByRole(source, path.dataRole) : source;

    return (path.filePath ?? []).reduce((current, key) => current[key], target);
};

export default resolvePath;
