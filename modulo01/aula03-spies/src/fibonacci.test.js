// Fibonacci: o próximo número é a soma dos dois anteriores
// input: 3
// 0, 1, 1
// input: 5
// 0, 1, 1, 2, 3
const { createSandbox } = require("sinon");
const assert = require("node:assert");
const Fibonacci = require("./fibonacci");

const sinon = createSandbox();

(async () => {
	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);
		
		// Número de sequencia: 3
		// [0] input = 5, current = 0, next = 1
		// [1] input = 4, current = 1, next = 1
		// [2] input = 3, current = 1, next = 2
		// [3] input = 2, current = 2, next = 3 -> PARA
		for (const sequenci of fibonacci.execute(3)) {}

		const expectedCallCount = 4;
		
		assert.strictEqual(spy.callCount, expectedCallCount);
	}
	
	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);
		
		// Número de sequencia: 5
		// [0] input = 5, current = 0, next = 1
		// [1] input = 4, current = 1, next = 1
		// [2] input = 3, current = 1, next = 2
		// [3] input = 2, current = 2, next = 3
		// [4] input = 1, current = 3, next = 5
		// [5] input = 0, current = 5, next = 8 -> PARA
		const results = [...fibonacci.execute(5)];
		const { args } = spy.getCall(2);

		const expectedCallCount = 6;
		const expectedParams = [3, 1, 2];
		const expectedResult = [0, 1, 1, 2, 3];

		assert.strictEqual(spy.callCount, expectedCallCount);
		assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais!");
		assert.deepStrictEqual(results, expectedResult);
	}
})();