#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, power, age }) => ({ name, power, age, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
    .command("createHero", "create a hero", (builder) => {
        return builder
            .option("name", {
                alias: "n",
                demandOption: true,
                description: "hero name",
                type: "string"
            })
            .option("age", {
                alias: "a",
                demandOption: true,
                description: "hero age",
                type: "number"
            })
            .option("power", {
                alias: "p",
                demandOption: true,
                description: "hero power",
                type: "string"
            })
            .example("createHero --name Flash --age 55 --power Speed", "create a hero")
            .example("createHero -n Flash -a 55 -p Speed", "create a hero with short options");
    })
    .epilog("copyright 2025 - Matheus de Gondra");


console.log(hero(argv));