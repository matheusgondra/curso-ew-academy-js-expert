import { pipeline } from "node:stream/promises";
import { createReadStream, write } from "node:fs";
import { Transform, Writable } from "node:stream";
import csvtojson from "csvtojson";
import { setTimeout } from "node:timers/promises";

const database = process.argv[2];

async function onMessage(msg) {
    const firstTimeRan = [];

    await pipeline(
        createReadStream(database),
        csvtojson(),
        Transform({
            transform(chunk, _encoding, callback) {
                const data = JSON.parse(chunk);
                if (data.Name !== msg.Name) {
                    return callback();
                }

                if (firstTimeRan.includes(msg.Name)) {
                    return callback(null, msg.Name);
                }

                firstTimeRan.push(msg.Name);
                callback();
            }
        }),
        Writable({
            write(chunk, _encoding, callback) {
                if (!chunk) {
                    return callback();
                }

                process.send(chunk.toString());
                callback();
            }
        })
    )
}

process.on("message", onMessage);

await setTimeout(5000);

process.channel.unref();