import { PassThrough, Writable } from "stream"
import axios from "axios";

const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
    axios({
        method: "get",
        url: API_01,
        responseType: "stream"
    }),
    axios({
        method: "get",
        url: API_02,
        responseType: "stream"
    })
]);

const results = requests.map(({ data }) => data);

const output = Writable({
    write(chunk, encoding, callback) {
        const data = chunk.toString().replace(/\n/, "");
        // ?=- -> faz procurar a partir do - e olhar para trás
        // (?<name>.*) -> procura pelo contaudo dentro das aspas apos o : e extrai somente o nome
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
        console.log(`[${name.toLowerCase()}] ${data}`);
        callback();
    }
});

function merge(streams) {
    return streams.reduce((prev, current, index, items) => {
        // impede que a stream feche sozinha
        current.pipe(prev, { end: false });

        // como colocamos end: false, vamos manipular manualmente quando o nosso current
        // terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
        // ele vai então forçar a cadeia do anterior a se fechar
        current.on("end", () => items.every(s => s.ended) && prev.end());

        return prev;
    }, new PassThrough());
}
// result[0].pipe(output);
// result[1].pipe(output);
merge(results).pipe(output);