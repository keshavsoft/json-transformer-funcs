import { collectionFromInternal } from "../../src/index.js";

import data from "./data.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };
import table from "./table.json" with { type: "json" };

const compiledTableSpec = collectionFromInternal(
  data.rows,
  spec.buildBody.outerTemplate,
  spec.buildBody.innerTemplate
);

console.log("1. Compiled Table Spec (from json-transformer-funcs):", compiledTableSpec);
