const http = require("node:http");
const Router = require("./router");
const jsonMiddleware = require("./jsonMiddleware");
const routeAdapter = require("./routeAdapter");
const makeCarController = require("./factory");

const PORT = process.env.PORT || 3000;

const handler = (request, response) => {
    const router = new Router({ request, response });
    router.use(jsonMiddleware);

    router.post("/", routeAdapter(makeCarController()));
};

const app = http.createServer(handler);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = app;