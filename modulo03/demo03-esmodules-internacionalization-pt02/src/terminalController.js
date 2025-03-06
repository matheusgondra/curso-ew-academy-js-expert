import chalkTable from "chalk-table";
import chalk from "chalk";
import DraftLog from "draftlog";
import readLine from "node:readline";
import { Person } from "./person.js";

export class TerminalController {
    constructor() {
        this.print = {};
        this.data = {};
        this.terminal = {};
    }

    inicializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin);
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.inicializeTable(database, language);
    }

    inicializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language));
        const table = chalkTable(this.getTableOptions(), data);

        this.print = console.draft(table);
        this.data = data;
    }

    question(msg = "") {
        return new Promise(resolve => this.terminal.question(msg, resolve));
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
                { field: "from", name: chalk.cyan("from") },
                { field: "to", name: chalk.cyan("to") }
            ]
        };
    }

    closeTerminal() {
        this.terminal.close();
    }
}