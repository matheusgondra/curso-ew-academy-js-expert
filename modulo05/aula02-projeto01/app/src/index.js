"use strict";

const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const pdf = require("pdf-parse");

(async () => {
    const dataBuffer = await readFile(join(__dirname, "./../../docs/contrato.pdf"));
    const data = await pdf(dataBuffer);
    console.log(data.text);
})();