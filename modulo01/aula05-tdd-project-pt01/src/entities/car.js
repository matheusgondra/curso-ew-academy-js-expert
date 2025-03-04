const Base = require("./base/base");

class Car extends Base {
	constructor({ id, name, realeaseYear, available, gasAvailable }) {
		super({ id, name });
		this.realeaseYear = realeaseYear;
		this.available = available;
		this.gasAvailable = gasAvailable;
	}
}

module.exports = Car;