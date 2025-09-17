import { createServer } from "node:http";
import { parse } from "node:url";
import { Worker } from "node:worker_threads";
import "sharp";

const currentFolder = import.meta.dirname;
const workerFileName = "worker.js";

async function joinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`);
        worker.postMessage(images);
    
        worker.once("message", resolve);
        worker.once("error", reject);
        worker.once("exit", code => {
            if (code !== 0) {
                return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`));
            }

            console.log(`Thread ${worker.threadId} has exited`);
        });
    })
}

async function handler(request, response) {
    if (request.url.includes("joinImages")) {
        const { query: { background, img } } = parse(request.url, true);
        const imageBase64 = await joinImages({
            image: img,
            background
        });

        response.writeHead(200, {
            "Content-Type": "text/html"
        });


        response.end(`<img src="data:image/jpg;base64,${imageBase64}" />`);
        return;
    }
    
    return response.end("ok");
}

createServer(handler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


// localhost:3000/joinImages?img=https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/pt_BR/games/switch/h/hollow-knight-switch/description-image&background=https://pbs.twimg.com/media/GsfZ9c5b0AQfhqG?format=jpg&name=4096x4096

// https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_200/ncom/pt_BR/games/switch/h/hollow-knight-switch/description-image
// https://static.wikia.nocookie.net/hollowknight/images/4/47/The_Knight_Idle.png/revision/latest/scale-to-width/360?cb=20230729215840&path-prefix=pt

// background
// https://pbs.twimg.com/media/GsfZ9c5b0AQfhqG?format=jpg&name=4096x4096