import { tableFromData } from "../../src/index.js";

import data from "./data.json" with { type: 'json' };
import spec from "./spec.json" with { type: 'json' };
import table from "./table.json" with { type: 'json' };

const start = () => {
  try {
    let result = tableFromData({
      inData: data,
      inSpec: spec,
      inTable: table
    });

    console.log("table : ", JSON.stringify(result, null, 2));
  } catch (err) {
    console.log("error : ", err);
  }
};

start();
