import { TerminalController } from "./terminalController.js";
import database from "../database.json" with { type: "json" };
import { Person } from "./person.js";

const DEFAULT_LANGUAGE = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.inicializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
    try {
        const answer = await terminalController.question();

        if (answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log("Process finished");
            return;
        }

        const person = Person.generateInstance(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));

        return mainLoop();
    } catch (error) {
        console.error("DEU RUIM**", error);
        return mainLoop();
    }
}

await mainLoop();