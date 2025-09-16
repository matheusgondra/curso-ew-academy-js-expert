import { appendFile } from "node:fs/promises";
import { createServer } from "node:http";

export function initializeServer() {
    async function handler(req, res) {
        await appendFile("./log.txt", `processed by ${process.pid}\n`);
        const result = Array.from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
            .reduce((acc, curr) => acc + curr, 0);
    
        res.end(result.toString());
    }
    
    createServer(handler).listen(3000, () => console.log("Server running at 3000 and pid:", process.pid));

    setTimeout(() => process.exit(1), Math.random() * 1e4);
}
