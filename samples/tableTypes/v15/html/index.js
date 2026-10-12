// import render from "../../docs/dist/v13/min.js";

import footer from "./buildSpec/index.js";

// import render from "../../src/index.js";

import data from "./data.json" with { type: "json" };

const start = () => {
  try {
    const localSpec = {
      targetHtmlId: "dom-render-container",
      columns: [
        { columnName: "itemName", label: "Item Name", width: "70%" },
        { columnName: "baseUnit", label: "Base Unit", width: "30%" }
      ],
      colGroup: [
        { width: "70%" },
        { width: "30%" }
      ],
      data: data.slice(0, 5)
    };

    const spec = footer(localSpec);
    console.log("spec : ", spec);

    const controls = window.ks.jsonToTag.buildSpecElement(spec);

    let jVarLocaldom = document.getElementById('dom-render-container');

    jVarLocaldom.appendChild(controls);

    console.log("Rendered table element: ", spec, controls);
  } catch (err) {
    console.error("error : ", err);
  }
};

start();