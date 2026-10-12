import {
    fromCollection, tableBody, buildBody
} from "../../../../../src/index.js";
// import data from "./data.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };

const jsonRegistry = {
    data: "",
    spec
};

const functionRegistry = {
    fromCollection, tableBody, buildBody
};

const startFunc = (inData) => {
    jsonRegistry.data = inData;

    jsonRegistry.base = functionRegistry.fromCollection(jsonRegistry.data?.columns, jsonRegistry.spec?.buildSelect);

    jsonRegistry.base.forEach(loopSelect => {
        const optionSpec = structuredClone(jsonRegistry.spec?.buildOption);
        const dataName = `\${${loopSelect?.attributes?.["data-name"]}}`;

        optionSpec.textContent = dataName;
        optionSpec.attributes.value = dataName;

        const options = functionRegistry.fromCollection(jsonRegistry.data?.data, optionSpec);
        loopSelect.children = options;
    });

    return jsonRegistry.base;
};

export default startFunc;