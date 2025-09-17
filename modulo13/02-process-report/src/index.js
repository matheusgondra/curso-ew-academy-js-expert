import { fork } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { pipeline } from "node:stream/promises";
import { createReadStream } from "node:fs";
import { Writable } from "node:stream";
import csvtojson from "csvtojson";

const PROCESS_COUNT = 30;
const replications = [];

const database = "./data/All_Pokemon.csv";

const backgroundTaskFile = "./src/backgroundTask.js";
const processes = new Map();

for (let i = 0; i < PROCESS_COUNT; i++) {
    const child = fork(backgroundTaskFile, [database]);
    child.on("exit", () => {
        console.log(`process ${child.pid} exited`);
        processes.delete(child.pid);
    });

    child.on("error", (error) => {
        console.error(`process ${child.pid} error:`, error);
        process.exit(1);
    });
    
    child.on("message", (msg) => {
        if (replications.includes(msg)) {
            return;
        }

        console.log(`${msg} is replicated!`);
        replications.push(msg);
    });
    
    processes.set(child.pid, child);
}

function roundRobin(array, index = 0) {
    return function() {
        if (index >= array.length) {
            index = 0;
        }

        return array[index++];
    }
}

const getProcess = roundRobin([...processes.values()]);

console.log(`stating with ${processes.size} processes`);
await setTimeout(100);

await pipeline(
    createReadStream(database),
    csvtojson(),
    Writable({
        write(chunk, encoding, callback) {
            const chosenProcess = getProcess();
            chosenProcess.send(JSON.parse(chunk));
            callback();
        }
    })
)