import timers from "timers/promises";

const timeoutAsync = timers.setTimeout;

// const results = ["1", "2"].map(async (item) => {
//     console.log("Start process");
//     await timeoutAsync(100);
//     console.count("debug");
//     console.log(item);
//     console.log(await Promise.resolve("timeout order"));
//     await timeoutAsync(100);
//     console.count("debug");

//     return parseInt(item) * 2;
// });

// console.log("results: ", await Promise.all(results));

setTimeout(async () => {
    console.log("Start process");
    await timeoutAsync(100);
    console.count("debug");
    console.log(await Promise.resolve("timeout order"));
    await timeoutAsync(100);
    console.count("debug");

    await Promise.reject("promise reject on timeout!");
}, 1000);

const throwError = (msg) => {
    throw new Error(msg);
};

try {
    console.log("Hello");
    console.log("World");
    throwError("erro dentro do try/catch");
} catch (error) {
    console.log("pego no catch: ", error.message);
} finally {
    console.log("Executed after all");
}

process.on("unhandledRejection", (reason, promise) => {
    console.log("unhandledRejection: ", reason.message || reason);
});

process.on("uncaughtException", (reason, promise) => {
    console.log("uncaughtException: ", reason.message || reason);
    // process.exit(1);
});

Promise.reject("promised rejected");

// Se o Promise.reject estiver dentro de um outro contexto, ele cai no unhandledRejection
setTimeout(async function () {
    await Promise.reject("promised async/await rejected");
}, 1000);

// Se o Promise.reject estiver no contexto global, ele cai no uncaughtException
// await Promise.reject("promised rejected");

// uncaughtException
setTimeout(() => {
    throwError("erro fora do try/catch");

}, 1000);