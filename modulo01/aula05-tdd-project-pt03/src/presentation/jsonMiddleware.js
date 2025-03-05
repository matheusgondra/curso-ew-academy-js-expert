const jsonMiddleware = async (request, response) => {
    let body = "";

    for await (const data of request) {
        body += data;
    }

    request.body = JSON.parse(body);
};

module.exports = jsonMiddleware;