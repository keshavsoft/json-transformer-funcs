import collectionFromKey from "../collectionFromKey/index.js";
import collectionFromInternal from "../collectionFromInternal/index.js";

const defaultSpec = {
    buildHeader: {
        tagName: "th",
        textContent: "${columnName}"
    },
    buildBody: {
        outerTemplate: {
            tagName: "tr"
        },
        innerTemplate: {
            tagName: "td",
            textContent: "${rowValue}"
        }
    }
};

const defaultTable = {
    tagName: "table",
    attributes: {
        class: "table table-hover table-striped align-middle border mb-0"
    },
    children: [
        {
            tagName: "thead",
            attributes: {
                class: "table-dark"
            },
            children: [
                {
                    tagName: "tr",
                    children: []
                }
            ]
        },
        {
            tagName: "tbody",
            children: []
        }
    ]
};

const startFunc = ({ inData, inSpec = defaultSpec, inTable = defaultTable }) => {
    const localData = inData;
    const localSpec = inSpec || defaultSpec;
    const localTable = structuredClone(inTable || defaultTable);

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

export { defaultSpec, defaultTable };
export default startFunc;
