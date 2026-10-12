import { collectionFromKey, collectionFromInternal } from "../../src/index.js";

import data from "./data.json" with { type: 'json' };
import spec from "./spec.json" with { type: 'json' };

const start = () => {
  try {
    let head = collectionFromKey(data.columns, spec.buildHeader, "columnName");
    console.log("head : ", head);

    let body = collectionFromInternal(data.rows, spec.buildBody.outerTemplate, spec.buildBody.innerTemplate);
    console.log("body : ", JSON.stringify(body, null, 2));

  } catch (err) {
    console.log("error : ", err);
  };
};

start();