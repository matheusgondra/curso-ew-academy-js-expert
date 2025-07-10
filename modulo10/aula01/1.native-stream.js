// const { stdin, stdout } = process;

// stdin.pipe(stdout)
//     .on("data", msg => console.log("data:", msg.toString()))
//     .on("error", err => console.error("error:", err))
//     .on("end", () => console.log("end"))
//     .on("close", () => console.log("close"));

// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(require('crypto').randomBytes(1e9))" > big.file
// node -e "require('fs').writeFileSync('big.file', require('crypto').randomBytes(1e6))"

import http from "http";
import { readFileSync, createReadStream } from "fs";

http.createServer((req, res) => {
    // má prática
    // const file = readFileSync("big.file").toString();
    // res.write(file);
    // res.end();

    createReadStream("big.file").pipe(res);
}).listen(3000, () => console.log("running at 3000"));