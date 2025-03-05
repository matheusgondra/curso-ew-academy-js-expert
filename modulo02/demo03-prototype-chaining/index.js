const { deepStrictEqual } = require("node:assert");

const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explicitas
console.log("new Object() is {}?", new Object().__proto__ === {}.__proto__);
deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que possui as propriedades nele
console.log("obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype);
deepStrictEqual(obj.__proto__, Object.prototype);

console.log("arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype);
deepStrictEqual(arr.__proto__, Array.prototype);

console.log("fn.__proto__ === Function.prototype", fn.__proto__ === Function.prototype);
deepStrictEqual(fn.__proto__, Function.prototype);

// O __proto__ de Object.prototype é null
console.log("Object.prototype.__proto__ === null", Object.prototype.__proto__ === null);
deepStrictEqual(Object.prototype.__proto__, null);

console.log("----------------------------------");

function Employee() {}
Employee.prototype.salary = () => "salary**";

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// podemos chamar via prototype, mas se tentar chamar direto, não funciona
console.log("Manager.prototype.salary()", Manager.prototype.salary());

// se não chamar o "new", o primeiro __proto__ vai ser sempre
// a instancia de Function, sem hendar nossas classes
// Para acessar as classe sem o new, pode acessar direto via prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype);
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

console.log("----------------------------------");

console.log("manager.__proto__: %s, manager.salary(): %s", new Manager().__proto__, new Manager().salary());
console.log(Supervisor.prototype === new Manager().__proto__.__proto__);
deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

console.log("----------------------------------");

const manager = new Manager();
console.log("manager.salary()", manager.salary());
console.log("manager.profitShare()", manager.profitShare());
console.log("manager.monthlyBonuses()", manager.monthlyBonuses());

deepStrictEqual(manager.__proto__, Manager.prototype);
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

console.log("----------------------------------");

class T1 {
	ping() { return "ping"; }
}

class T2 extends T1 {
	pong() { return "pong"; }
}

class T3 extends T2 {
	shot() { return "shot"; }
}

const t3 = new T3();

console.log("t3 inherits null?", t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
console.log("t3.ping()", t3.ping());
console.log("t3.pong()", t3.pong());
console.log("t3.shot()", t3.shot());

deepStrictEqual(t3.__proto__, T3.prototype);
deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);