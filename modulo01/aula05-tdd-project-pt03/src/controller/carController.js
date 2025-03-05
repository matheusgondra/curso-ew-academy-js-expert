const Response = require("../presentation/response");

class CarController {
    constructor({ carService }) {
        this.carService = carService;
    }

    async handle(request) {
        try {
            const { customer, carCategory, numberOfDays } = request.body;
            if (!customer || !carCategory || !numberOfDays) {
                return Response.badRequest("customer, carCategory and numberOfDays are required");
            }

            const transaction = await this.carService.rent(customer, carCategory, numberOfDays);
            return Response.success(transaction);
        } catch (error) {
            console.error("Error on rent a car", error);
            return Response.internalServerError();
        }
    }
}

module.exports = CarController;