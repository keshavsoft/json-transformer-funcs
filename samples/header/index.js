import { collectionFromKey } from "../../src/index.js";

import sampleData from "./sampleData.json" with { type: "json" };
import sampleSpec from "./sampleSpec.json" with { type: "json" };

const localColGroup = collectionFromKey(sampleData.colGroup, sampleSpec.buildColGroup);

console.log("localColGroup : ", localColGroup);



const localHead = collectionFromKey(sampleData.columns, sampleSpec.buildHeader);

console.log("localHead : ", localHead);

