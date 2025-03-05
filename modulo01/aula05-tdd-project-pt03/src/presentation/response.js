class Response {
    static success(data) {
        return {
            statusCode: 200,
            body: data
        };
    }

    static badRequest(data) {
        return {
            statusCode: 400,
            body: data
        };
    }

    static internalServerError() {
        return {
            statusCode: 500,
            body: "Internal Server Error"
        };
    }
}

module.exports = Response;