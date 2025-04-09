import http from "http";
import { InjectHttpInterceptor } from "../index.js";

InjectHttpInterceptor();

function handleRequest(request, response) {
	response.end("Hello, world!");
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () => console.log(`Server is running at http://localhost:${server.address().port}`));
