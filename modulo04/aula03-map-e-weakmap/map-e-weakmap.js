const assert = require("node:assert");

const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
    .set(1, "one")
    .set("Matheus", { text: "two" })
    .set(true, () => "three");

const myMapWithContructor = new Map([
    [1, "str1"],
    ["1", "num1"],
    [true, "bool1"],
])
// console.log("myMapWithContructor", myMapWithContructor);
// console.log("myMap", myMap);

// console.log("myMap.get(1)", myMap.get(1));
assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Matheus"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "three");

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: "Matheus" });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Matheus" });

// utilitários

// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: "Matheus" }).hasOwnProperty("name")
assert.ok(myMap.has(onlyReferenceWorks));

// para remover o item do objeto
// delete item.key
// imperformático para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks));

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Matheus", { "text": "two" }], [true, () => { }]]));

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === "[object Object]"
// ({ toString: () => "Hey" }).toString() === "Hey"

// Qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf, etc
const actor = {
    name: "Xuxa da Silva",
    toString: "Queen: Xuxa",
};

// Não tem restrição de nome de chave 
myMap.set(actor);

assert.deepStrictEqual(myMap.has(actor), true);
assert.deepStrictEqual(myMap.get(actor), undefined);

// Não da para limpar um Object sem reassiná-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beeem especificos

// tem a maioria dos beneficios do Map
// Mas: não é iteravel
// Só chaves de referencias e que você já conhecia
// mais leve e preve leak   de memória, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: "Flash" };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);
