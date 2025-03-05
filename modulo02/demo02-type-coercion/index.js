9999999999999999 // 16
// 10000000000000000

true + 2
// 3

'21' + true
// '21true'

'21' - true
// 20

'21' - -1
// 22

0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false

3 > 2 >= 1
// true

"B" + "a" + +"a" + "a"
// BaNaNa

"1" == 1
"1" === 1

// ---------------

console.assert(String(123) === "123", "explicit conversion to string");
console.assert(123 + "" === "123", "implicit conversion to string");

console.assert(("hello" || 123) === "hello", "|| returns the first value");
console.assert(("hello" && 123) === 123, "&& returns the second value");

// ---------------

const item = {
	name: "Matheus",
	age: 24,
	// string: 1° se não for primitivo, chama o valueOf
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	// number: 2° se não for primitivo, chama o toString
	valueOf() {
		return 7;
	}
};

// console.log("conversão para string (toString):", String(item));
// console.log("conversão para number (valueOf):", Number(item));

const item2 = {
	name: "Matheus",
	age: 24,
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	valueOf() {
		// irá chamar o toString, porque o valueOf não retornou um primitivo
		return { hey: "dude" };
	}
};

// retorna NaN, porque o toString não retornou um numero
// console.log("conversão para number valueOf > toString > NaN:", Number(item2));

const item3 = {
	name: "Matheus",
	age: 24,
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	valueOf() {
		return { hey: "dude" };
	},
	// tem prioridade sobre o valueOf e toString
	[Symbol.toPrimitive](coercionType) {
		const types = {
			string: JSON.stringify(this),
			number: "7"
		};

		return types[coercionType] || types.string;
	}
};

// console.log("conversão para string (Symbom.toPrimitive):", String(item3));
// console.log("conversão para number (Symbom.toPrimitive):", Number(item3));

// chama a conversão default
// console.log("conversão para Date (Symbom.toPrimitive):", new Date(item3));

console.assert(item3 + 0 === `{"name":"Matheus","age":24}0`);
console.assert(!!item3);

console.assert("Ae".concat(item3) === `Ae{"name":"Matheus","age":24}`);

console.assert(item3 == String(item3));

const item4 = { ...item3, name: "Zezinho", age: 20 };
console.assert(item4.name === "Zezinho" && item4.age === 20);