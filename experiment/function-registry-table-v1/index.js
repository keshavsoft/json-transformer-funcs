import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import executeInstructions from "./executeInstructions.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

const completedSpec = executeInstructions({
    spec: readJson("table.template.json"),
    templates: readJson("templates.json"),
    data: readJson("data.json"),
    instructions: readJson("instructions.json")
});

console.log(JSON.stringify(completedSpec, null, 2));
