const http = require("node:http");
const { once } = require("node:events");

const DEFAULT_USER = {
	username: "Erickwendel",
	password: "123"
}

const routes = {
	"/contact:get": (request, response) => {
		response.write("contact us page");
		return response.end();
	},
	"/login:post": async (request, response) => {
		const user = JSON.parse(await once(request, "data"));
		const toLower = (text) => text.toLowerCase();
		if (
			toLower(user.username) !== toLower(DEFAULT_USER.username) ||
			user.password !== DEFAULT_USER.password
		) {
			response.writeHead(401);
			return response.end("Log in failed!");
		}
		
		return response.end("Log in succeeded!");
	},
	default: (request, response) => {
		response.writeHead(404);
		response.write("not found");
		return response.end();
	}
}

function handler(request, response) {
	const { url, method } = request;
	const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
	const chosen = routes[routeKey] || routes.default;

	return chosen(request, response);
}

const app = http.createServer(handler);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

module.exports = app;