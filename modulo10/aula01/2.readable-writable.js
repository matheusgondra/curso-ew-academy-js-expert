import { Readable, Writable } from "stream";

// fonte de dados
const readable =  new Readable({
    read() {
        this.push("Hello World 1");
        this.push("Hello World 2");
        this.push("Hello World 3");

        // informa que os dados acabaram
        this.push(null);
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
    // writable é sempre a saída -> imprimir, salvar, ignorar
    .pipe(writable);
    // .pipe(process.stdout);