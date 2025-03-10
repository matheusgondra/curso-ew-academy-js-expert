"use strict";

const assert = require("assert");

// Garatir a semantica e segunrana de um objeto

// --- aply
const myObj = {
	add(myValue) {
		return this.arg1 + this.arg2 + myValue;
	}
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError("Eita!!"); };

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError("Vixi!!!"); }

assert.throws(() => myObj.add.apply({}, []), {
	name: "TypeError",
	message: "Vixi!!!"
});

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
// --- aply

// --- defineProperty

// questões semânticas
function MyDate() { }

// feio pra caramba, tudo é Object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });

// agora faz sentido
Reflect.defineProperty(MyDate, "withReflect", { value: () => "Hey dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflect(), "Hey dude");

// --- defineProperty

const withDelete = { user: "matheus" };
// imperformatico, evite ao maximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflect = { user: "xuxa da silva" };
Reflect.deleteProperty(withReflect, "user");

assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false);

// --- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1["username"], undefined);

// com reflect, uma exceção é lançada
assert.throws(() => Reflect.get(1, "username"), TypeError);

// --- has

assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// --- ownKeys

const user = Symbol("user");
const databaseUser = {
	id: 1,
	[Symbol.for("password")]: 123,
	[user]: "matheus"
};

// Com os metodos de Object, temos que fazer 2 requisições 
const objectKeys = [
	...Object.getOwnPropertyNames(databaseUser),
	...Object.getOwnPropertySymbols(databaseUser)
];
// console.log('objectKeys:', objectKeys);

assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);

// com reflect, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ["id", Symbol.for("password"), user]);