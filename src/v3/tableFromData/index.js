import collectionFromKey from "../collectionFromKey/index.js";
import collectionFromInternal from "../collectionFromInternal/index.js";

const startFunc = ({ inData, inSpec, inTable }) => {
    const localData = inData;
    const localSpec = inSpec;
    const localTable = structuredClone(inTable);

    const localHead = collectionFromKey(localData.columns, localSpec.buildHeader);
    const localBody = collectionFromInternal(
        localData.rows,
        localSpec.buildBody.outerTemplate,
        localSpec.buildBody.innerTemplate
    );

    const thead = localTable.children.find(child => child.tagName === "thead");
    const tbody = localTable.children.find(child => child.tagName === "tbody");

    thead.children[0].children = localHead;
    tbody.children = localBody;

    return localTable;
};

export default startFunc;
