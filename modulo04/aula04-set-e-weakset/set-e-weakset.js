const assert = require("node:assert");

// usado na maioria das vezes para listas de itens únicos
const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"]);

// console.log('set.keys():', set.keys());
// console.log('set.values():', set.values()); // só existe por conta do Map

// No Array comum, para verificar se item existe
// [].indexOf("1") !== -1 ou [0].includes(0)
assert.ok(set.has("3"));

// Mesma teoria do Map, mas você não trabalha com chave e valor
// Não tem get, então você precisa sabe se o item está ou não no Array é isso.
// na documentação tem exemplos sobre
const user01 = new Set([
	"erick",
	"mariazinha",
	"xuxa da silva"
]);
const user02 = new Set([
	"jose",
	"erick",
	"pedro"
]);

const intersection = new Set([...user01].filter(user => user02.has(user)));
// console.log('intersection:', intersection);

// A partir do Node 22 foram adicionados novos metodos para o Set
// Set.prototype.intersection(other)
// Set.prototype.union(other)
// Set.prototype.difference(other)
// Set.prototype.symmetricDifference(other)
// Set.prototype.isSubsetOf(other)
// Set.prototype.isSupersetOf(other)
// Set.prototype.isDisjointFrom(other)
// const intersectionNode22 = user01.intersection(user02);
// console.log('intersectionNode22:', intersectionNode22);

assert.deepStrictEqual(Array.from(intersection), ["erick"]);

const difference = new Set([...user01].filter(user => !user02.has(user)));
// console.log('difference:', difference);
assert.deepStrictEqual(Array.from(difference), ["mariazinha", "xuxa da silva"]);

// WeakSet

/*
	Mesma ideia do WeakMap
	não é enumerável (iterável)
	só trabalha com chaves como referência
	só tem métodos simples
*/

const user = { id: 123 };
const user2 = { id: 321 };
const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
console.log('weakSet:', weakSet);