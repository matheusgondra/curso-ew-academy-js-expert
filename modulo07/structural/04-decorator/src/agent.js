import http from "http";

async function InjectHttpInterceptor() {
	const oldEmit = http.Server.prototype.emit;
	http.Server.prototype.emit = function (...args) {
		const [type, req, response] = args;
		if (type === "request") {
			response.setHeader("X-Instrumented-By", "ErickWendel");
		}

		return oldEmit.apply(this, args);
	};
}

export { InjectHttpInterceptor };
