"use strict";

const Event = require("node:events");

const event = new Event();
const eventName = "counter";

event.on(eventName, msg => console.log("counter updated", msg));

const myCounter = {
	counter: 0
};

const proxy = new Proxy(myCounter, {
	set: (target, property, newValue) => {
		event.emit(eventName, { newValue, key: target[property] });
		target[property] = newValue;
		return true;
	},
	get: (object, prop) => {
		// console.log("chamou!", { object, prop });
		return object[prop];
	}
});

setInterval(function () {
	proxy.counter += 1;
	console.log("[3]: setInterval")
	if (proxy.counter === 5) {
		clearInterval(this);
	}
}, 200);

setTimeout(function () {
	proxy.counter = 4;
	console.log("[2]: setTimeout")
}, 100);

// se quer que executa agora
setImmediate(() => {
	console.log("[1]: setImmediate", proxy.counter)
})

// executa agora, agorinha, mas acaba com o ciclo de vida do node
process.nextTick(() => {
	proxy.counter = 2;
	console.log("[0]: nextTick")
})