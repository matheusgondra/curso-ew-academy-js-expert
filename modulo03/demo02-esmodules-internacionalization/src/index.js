import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readLine from "node:readline";
import database from "./../database.json" with { type: "json" };
import { Person } from "./person.js";

const DEFAULT_LANGUAGE = "pt-BR";

DraftLog(console).addLineListener(process.stdin);

const option = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.cyan("from") },
        { field: "to", name: chalk.cyan("to") }
    ]
};

const table = chalkTable(option, database.map(item => new Person(item).formatted(DEFAULT_LANGUAGE)));
const print = console.draft(table);

const terminal = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});