import { spawn } from "node:child_process";

const pythonFile = "index.py";
const pythonCommand = "python";

async function requestPython({ url, headers, filePath }) {
    const py = spawn(pythonCommand, [
        pythonFile,
        JSON.stringify({ url, headers, filePath })
    ]);

    const dataStream = [];
    for await (const data of py.stdout) {
        console.log(">>> ", data.toString());
        dataStream.push(data.toString());
    }

    return dataStream.join("");
}

const result = await requestPython({
    url: "http://localhost:3000",
    filePath: "my-data.csv"
});

console.log({ result });