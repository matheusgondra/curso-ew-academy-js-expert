import { Duplex, Transform } from "stream";

let count = 0;
const server = new Duplex({
    objectMode: true, // faz não precisar trabalhar com buffer => gasta mais memoria
    encoding: "utf-8",

    read(size) {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Matheus[${count}]`);
                return;
            }

            clearInterval(intervalContext);
            this.push(null);
        }

        setInterval(function () { everySecond(this); });
    },

    // write é como se fosse um objeto completamente diferente
    write(chunk, encoding, cb) {
        console.log("[writable] saving:", chunk);

        cb();
    }
});

// provar que são canais de comunicação diferentes
// write() aciona o write do duplex
server.write("[duplex] hey this is a writable");

// on data -> loga o que rolou no .push() do readable
// server.on("data", msg => console.log(`[readable] ${msg}`));

// o push() deixa você enviar mais dados
server.push("[duplex] hey this is also a readable\n");

// server
//     .pipe(process.stdout);


const transformToUpperCase = new Transform({
    objectMode: true,
    
    transform(chunk, encoding, cb) {
        cb(null, chunk.toUpperCase());
    }
});
// Transform também é um duplex, mas não possuem comunicação independente
transformToUpperCase.write("[transform] hello from write!");

// push vai ignorar o que você tem na função transform
transformToUpperCase.push("[transform] hello from push!\n");

// redireciona todos os dados do readable para o writable da duplex
server
    .pipe(transformToUpperCase)
    .pipe(server);