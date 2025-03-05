const { join } = require("node:path");
const CarController = require("../controller/carController");
const CarService = require("../service/carService");

const makeCarController = () => {
    const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");
    const carService = new CarService({ cars: carsDatabase });
    return new CarController({ carService });
}

module.exports = makeCarController;