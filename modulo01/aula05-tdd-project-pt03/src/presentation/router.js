class Router {
    constructor({ request, response }) {
        this.request = request;
        this.response = response;
        this.middlewares = [];
    }

    async use(middleware) {
        this.middlewares.push(middleware);
    }

    async get(url, callback) {
        if (this.request.url === url && this.request.method === "GET") {
            this.middlewares.forEach(async middleware => {
                await middleware(this.request, this.response);
            });

            await callback(this.request, this.response);
        }
    }

    async post(url, callback) {
        if (this.request.url === url && this.request.method === "POST") {
            for (const middleware of this.middlewares) {
                await middleware(this.request, this.response);
            }

            await callback(this.request, this.response);
        }
    }
}

module.exports = Router;