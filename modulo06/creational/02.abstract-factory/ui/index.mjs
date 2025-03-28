import { database } from "../shared/data.mjs";

class Aplication {
	constructor(factory) {
		this.table = factory.createTable();
	}

	initialize() {
		this.table.render(database);
	}
}

(async () => {
	const path = globalThis.window ? "browser" : "console";
	const { default: ViewFactory } = await import(`./../platform/${path}/index.mjs`);
	console.log("ViewFactory", ViewFactory);
	const app = new Aplication(new ViewFactory());
	app.initialize(database);
})();
