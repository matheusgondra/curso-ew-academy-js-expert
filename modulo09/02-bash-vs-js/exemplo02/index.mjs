import { setTimeout } from "timers/promises";
import isSafe from "safe-regex";

$.verbose = false;

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);

const req = await $`curl --silent localhost:8080`;
console.log(`req\n`, req.stdout);

const containers = await $`docker ps`;

const exp = /(?<containerId>\w+)\W+(?=nginx)/;
if (!isSafe(exp)) {
    throw new Error("Regex is not safe");
}

const { groups: { containerId } } = containers.toString().match(exp);

const logs = await $`docker logs ${containerId}`;
console.log(`logs\n`, logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log(`rm\n`, rm.stdout);