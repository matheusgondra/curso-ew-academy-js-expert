import os from "node:os";
import cluster from "node:cluster";
import { initializeServer } from "./server.js";

(() => {
    if (!cluster.isPrimary) {
        initializeServer();
        return;
    }

    const cpuNumber = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    console.log(`Forking for ${cpuNumber} CPUs`);

    for (let i = 0; i < cpuNumber; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        }
    });
})();