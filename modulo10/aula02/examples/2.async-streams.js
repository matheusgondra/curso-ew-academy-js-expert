import { pipeline } from "stream/promises";
import { setTimeout } from "timers/promises";

async function* myCustomReadable() {
    yield Buffer.from("This is my");
    await setTimeout(1000);
    yield Buffer.from("Custom readable");
}

async function* myCustomTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString().replace(/\s/g, "_");
    }
}

async function* myCustomDuplex(stream) {
    let bytesRead = 0;
    const wholeString = [];

    for await (const chunk of stream) {
        console.log("[duplex writable]: ", chunk);
        bytesRead += chunk.length;
        wholeString.push(chunk);
    }

    yield `wholeString ${wholeString.join()}`;
    yield `bytesRead ${bytesRead}`;
}

async function* myCustomWritable(stream) {
    for await (const chunk of stream) {
        console.log("[writable]: ", chunk);
    }
}

try {
    const controller = new AbortController();
    // caso precise cancelar um fluxo
    setImmediate(() => controller.abort());

    await pipeline(
        myCustomReadable,
        myCustomTransform,
        myCustomDuplex,
        myCustomWritable,
        { signal: controller.signal }
    );
} catch (error) {
    console.error("Pipeline failed: ", error.message);
}

console.log("Process is done!");