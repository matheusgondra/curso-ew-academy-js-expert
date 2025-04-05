import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://matheus:senha0001@localhost:54321/heroes";
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionStrign = "mongodb://matheus:senha0001@localhost:27018/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionStrign));
await mongoDBContext.connect();

const data = [
	{
		name: "erickwendel",
		type: "transaction"
	},
	{
		name: "mariasilva",
		type: "activityLog"
	}
];

const contextTypes = {
	transaction: postgresContext,
	activityLog: mongoDBContext
};

for (const { type, name } of data) {
	const context = contextTypes[type];

	await context.create({ name: name + Date.now() });
	console.log(type, context.dbStrategy.constructor.name);
	console.log(await context.read());
}