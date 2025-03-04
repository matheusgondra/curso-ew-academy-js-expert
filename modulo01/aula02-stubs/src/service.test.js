const Service = require("./service");
const { createSandbox } = require("sinon");
const tatoine = require("../mocks/tatoine.json");
const alderaan = require("../mocks/alderaan.json");
const assert = require("node:assert");

const BASE_URL_1 = "http://swapi.dev/api/planets/1/";
const BASE_URL_2 = "http://swapi.dev/api/planets/2/";

const sinon = createSandbox();
const mocks = { tatoine, alderaan };

(async () => {
	// {
	// 	vai para a internet
	// 	const service = new Service();
	// 	const dados = await service.makeRequest(BASE_URL_2);
	// 	console.log("dados", JSON.stringify(dados));
	// }

	const service = new Service();
	const stub = sinon.stub(service, service.makeRequest.name);
	stub
		.withArgs(BASE_URL_1)
		.resolves(mocks.tatoine);

	stub
		.withArgs(BASE_URL_2)
		.resolves(mocks.alderaan);

	{
		const expected = {
			name: "Tatooine",
			surfaceWater: "1",
			appeardIn: 5
		};
		const result = await service.getPlanets(BASE_URL_1);
		assert.deepStrictEqual(result, expected);
	}

	{
		const expected = {
			name: "Alderaan",
			surfaceWater: "40",
			appeardIn: 2
		};
		const result = await service.getPlanets(BASE_URL_2);
		assert.deepStrictEqual(result, expected);
	}
})();