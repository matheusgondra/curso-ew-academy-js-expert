import { createWriteStream } from "fs";
import { Readable, Transform, Writable } from "stream";

// fonte de dados
const readable =  new Readable({
    read() {
        for (let i = 0; i < 1e5; i++) {
            const person = { id: Date.now() + i, name: `Matheus-${i}` };
            const data = JSON.stringify(person);

            this.push(data);
        }

        // informa que os dados acabaram
        this.push(null);
    }
});

// processamento de dados
const mapFields = new Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk);
        const result = `${data.id},${data.name.toUpperCase()}\n`;
        
        cb(null, result);
    }
});

const mapHeaders = new Transform({
    transform(chunk, encoding, cb) {
        this.counter = this.counter ?? 0;
        if (this.counter) {
            return cb(null, chunk);
        }

        this.counter++;


        cb(null, "id,name\n".concat(chunk));
    }
});

// saída de dados
const writable = new Writable({
    write(chunk, encoding, cb) {
        console.log("msg:", chunk.toString());

        cb();
    }
});

readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    // writable é sempre a saída -> imprimir, salvar, ignorar
    // .pipe(writable);
    // .pipe(process.stdout);
    .pipe(createWriteStream("my.csv"));