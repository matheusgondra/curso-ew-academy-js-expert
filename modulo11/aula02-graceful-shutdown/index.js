import { MongoClient } from "mongodb";
import { createServer } from "node:http";
import { promisify } from "node:util";

async function dbConnect() {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    console.log("MongoDB is connected!");
    
    const db = client.db("comics");
    
    return {
        collections: {
            heroes: db.collection("heroes")
        },
        client
    };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data);

            await collections.heroes.insertOne({
                ...hero,
                updatedAt: new Date().toISOString()
            });
            const heroes = await collections.heroes.find().toArray();
            console.log({ heroes });
            response.writeHead(200);
            response.write(JSON.stringify(heroes));
        } catch (error) {
            console.log("a request error has happened", error);
            response.writeHead(500);
            response.end("Internal server error!");
        } finally {
            response.end();
        }
    }
}

/*
curl -i localhost:3000 -X POST --data '{name: "Batman", "age": "80"}'
*/
const server = createServer(handler)
    .listen(3000, () => console.log("Server listening on 3000 and process", process.pid));

// SIGINT -> CTRL + C
// SIGTERM -> kill
const onStop = async (signal) => {
    console.info(`\n${signal} signal received`);

    console.log("Closing http server");
    await promisify(server.close.bind(server))();
    
    await client.close();
    console.log("Http server has closed");

    
    process.exit(0);
};

["SIGINT", "SIGTERM"].forEach((event) => {
    process.on(event, onStop);
});