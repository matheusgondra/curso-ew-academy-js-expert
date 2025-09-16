import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

async function handler(req, res) {
    const filename = `file-${randomUUID()}.csv`;
    await pipeline(
        req,
        createWriteStream(filename)
    );

    res.end("upload with success");
}

createServer(handler).listen(3000, () => console.log("Server running at 3000"));