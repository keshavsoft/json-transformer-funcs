import {
    fromCollection,
    findByRole
} from "json-transformer-funcs";

import spec from "./spec.json" with { type: "json" };
import base from "./config/base.json" with { type: "json" };

// Small adapter: convert one column into one datalist, using the reusable source function.
const buildOptionsForColumn = (columnName, rows) => {
    const source = rows.map(row => ({ rowValue: row[columnName] }));
    return fromCollection(source, spec.buildOption);
};

const buildDataListForColumn = (column, rows) => {
    const dataList = structuredClone(spec.buildDataList);
    const columnName = column.columnName;

    dataList.attributes = {
        ...dataList.attributes,
        id: columnName,
        "data-name": columnName
    };
    dataList.children = buildOptionsForColumn(columnName, rows);

    return dataList;
};

const buildDataListsFromColumns = ({ data, columns }) => {
    return columns.map(column => buildDataListForColumn(column, data));
};

const startFunc = data => {
    const dataListGroup = findByRole(base, "base-datalist");
    dataListGroup.children = buildDataListsFromColumns(data);
    return base;
};

const dataLists = startFunc({
    data: [{ name: "Keshav", age: 26 },
    { name: "Charan", age: 28 }
    ],
    columns: [{ columnName: "name", width: "300px" }, { columnName: "age", width: "100px" }]
});

console.log("all datalists : ", dataLists);
console.log("first datalist : ", dataLists.children[0]);
console.log("first option : ", dataLists.children[0].children[0]);
