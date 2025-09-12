import { createServer } from "node:http";
import Event from "node:events";
import { randomBytes } from "node:crypto";

const myEvent = new Event();

function getBytes() {
    return randomBytes(10000);
}

function onData() {
    getBytes();
    const items = [];
    setInterval(function myInterval() {
        items.push(Date.now());
    });
}

myEvent.on("data", onData);
createServer(function handler(req, res) {

    myEvent.emit("data", Date.now());

    res.end("ok");

}).listen(3000, () => console.log("Server running at 3000"));