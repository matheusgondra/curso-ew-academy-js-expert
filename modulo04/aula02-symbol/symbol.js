const assert = require("node:assert");

// ---- keys
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol";

// console.log("user.userName", user.userName);
// console.log("user[uniqueKey]", user[Symbol("userName")]);

assert.deepStrictEqual(user.userName, "value for normal Objects");

// sempre único em nível de endereço de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for Symbol");

// console.log("symbols", Object.getOwnPropertySymbols(user)[0]);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// bypass - má prática
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

// --- keys

// Well-known Symbols
const obj = {
    //iterators
    [Symbol.iterator]: () => ({
        items: ["c", "b", "a"],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
};

// for (const item of obj) {
//     console.log("item", item);
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg));
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") {
            throw new TypeError();
        }

        const items = this[kItems]
            .map(item => new Intl.DateTimeFormat("pt-BR", {
                month: "long",
                day: "2-digit",
                year: "numeric"
            }).format(item));

        return new Intl.ListFormat("pt-BR", {
            style: "long",
            type: "conjunction"
        }).format(items);
    }

    get [Symbol.toStringTag]() {
        return "WHAT?";
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item;
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

        for (const item of this[kItems]) {
            await timeout(100);
            yield item.toISOString();
        }
    }
}

const myDate = new MyDate(
    [2020, 3, 1],
    [2019, 2, 2]
);

const expectedDates = [
    new Date(2020, 3, 1),
    new Date(2019, 2, 2)
];

// chama o Symbol.toStringTag
assert.deepStrictEqual(Object.prototype.toString.call(myDate), "[object WHAT?]");
assert.throws(() => myDate + 1, TypeError);

// conversão explicita para chamar o Symbol.toPrimitive
assert.deepStrictEqual(String(myDate), "01 de abril de 2020 e 02 de março de 2019");

// chama o Symbol.iterator
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//     for await (const item of myDate) {
//         console.log("asyncIterator", item);
//     }
// })();

(async () => {
    const dates = await Promise.all([...myDate]);
    assert.deepStrictEqual(dates, expectedDates);
})();