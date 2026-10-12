import { collectionFromKey, collectionFromInternal } from "../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };
import tableJson from "./table.json" with { type: "json" };
import instructions from "./instuctions.json" with { type: "json" };

let tempTableJson = structuredClone(tableJson);

instructions.forEach(loopInstruction => {
    if (loopInstruction.func === "collectionFromKey") {

        const localHead = collectionFromKey(sampleData[loopInstruction.sourceKey], sampleSpec[loopInstruction.templateKey]);

        console.log("localHead : ", localHead);
    };
});

// const localColGroup = collectionFromKey(sampleData.colGroup, sampleSpec.buildColGroup);

// console.log("localColGroup : ", localColGroup);

