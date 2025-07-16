import http from "http";

let count = 1;

async function handler(request, response) {
    count++;
    
    try {
        if (count % 2 === 0) {
            await Promise.reject("erro dentro do try");
        } 
        
        for await (const _data of request) {
            try {
                if (count % 2 !== 0) {
                    await Promise.reject("Erro dentro do for");
                }
    
                // response.end();
            } catch (error) {
                console.log("a request error has happened", error);
                response.writeHead(500, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ error: "Internal Server Error" }));
                // response.end();
            } finally {
                response.end();
            }
        }
    } catch (error) {
        console.log("a server error has happened", error);
        response.writeHead(500, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ error: "Internal Server Error" }));
        response.end();
    }
}

http.createServer(handler).listen(3000, () => console.log("running on 3000"));