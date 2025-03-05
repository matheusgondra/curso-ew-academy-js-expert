const faker = require("faker");
const { join } = require("node:path");
const { writeFile } = require("node:fs/promises");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");
const { stringify } = require("node:querystring");

const ITEMS_AMOUNT = 2;

const seederBaseFolder = join(__dirname, "../", "database");


const carCategory = new CarCategory({
	id: faker.random.uuid(),
	name: faker.vehicle.type(),
	carIds: [],
	price: faker.finance.amount(20, 100)
});

const cars = [];
const customers = [];

for (let index = 0; index <= ITEMS_AMOUNT; index++) {
	const car = new Car({
		id: faker.random.uuid(),
		name: faker.vehicle.model(),
		available: true,
		releaseYear: faker.date.past().getFullYear(),
		gasAvailable: true
	});
	carCategory.carIds.push(car.id);
	cars.push(car);

	const customer = new Customer({
		id: faker.random.uuid(),
		name: faker.name.findName(),
		age: faker.random.number({ min: 18, max: 50 })
	});
	customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data, null, 2));

(async () => {
	await write("cars.json", cars);
	await write("carCategories.json", [carCategory]);
	await write("customers.json", customers);
})();