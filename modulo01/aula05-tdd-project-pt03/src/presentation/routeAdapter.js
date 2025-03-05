const routeAdapter = (controller) => {
    return async (request, response) => {
        const httpResponse = await controller.handle(request);
        response.writeHead(httpResponse.statusCode, { "Content-Type": "application/json" });
        response.end(JSON.stringify(httpResponse.body));
    }
};

module.exports = routeAdapter;