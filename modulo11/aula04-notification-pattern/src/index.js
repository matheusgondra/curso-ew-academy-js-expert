import { createServer } from "node:http";
import { statusCodes } from "./utils/httpStatusCode.js";
import { HeroEntity } from "./heroEntity.js";

async function handler(request, response) {
    for await (const data of request) {
        try {
            const parsedData = JSON.parse(data);
            if (Reflect.has(parsedData, "connectionError")) {
                // só um erro generico para trazer outro cenário de erro inexperado
                throw new Error("error connecting to DB!");
            }

            const hero = new HeroEntity(parsedData);
            if (!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST);
                response.end(hero.notifications.join(", "));
                continue;
            }

            response.writeHead(statusCodes.OK);
            response.end();
        } catch (error) {
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
            response.end();
        }
    }
}

createServer(handler).listen(3000, () => console.log("Server running at http://localhost:3000"));