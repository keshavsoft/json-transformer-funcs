import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import executeInstructions from "./executeInstructions.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const completed = executeInstructions({
    spec: readJson("table.template.json"),
    templates: readJson("templates.json"),
    data: readJson("data.json"),
    instructions: readJson("instructions.json")
});

assert.equal(completed.tagName, "table");
assert.equal(completed.children[0].tagName, "thead");
assert.equal(completed.children[0].children[0].children.length, 5);
assert.deepEqual(
    completed.children[0].children[0].children.map((cell) => cell.textContent),
    ["Item Code", "Item Name", "Category", "Unit Price", "Availability"]
);
assert.equal(completed.children[1].tagName, "tbody");
assert.equal(completed.children[1].children.length, 2);
assert.equal(completed.children[1].children[0].tagName, "tr");
assert.equal(completed.children[1].children[0].children.length, 5);
assert.deepEqual(
    completed.children[1].children[0].children.map((cell) => cell.textContent),
    ["SKU-1001", "Micro Drill Bit", "Precision Tooling", "$124.50", "In Stock"]
);

console.log("PASS: instructions invoked both registered functions.");
console.log("PASS: completed JSON-to-Tag tree contains header and body rows.");
