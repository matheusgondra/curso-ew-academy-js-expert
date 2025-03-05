const { describe, it } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const validCustomer = require("../mocks/valid-customer.json");
const validCarCategory = require("../mocks/valid-carCategory.json");

describe("Car Controller", () => {
    let app;

    before((done) => {
        app = require("../../src/presentation/server");
        app.once("listening", done);
    });

    after((done) => app.close(done));

    describe("POST /", () => {
        it("should return 400 when customer, carCategory or numberOfDays are not provided", async () => {
            const response = await request(app).post("/").send({});
            expect(response.statusCode).to.be.equal(400);
        });

        it("should return 200 when customer, carCategory and numberOfDays are provided", async () => {
            const response = await request(app).post("/").send({
                customer: validCustomer,
                carCategory: validCarCategory,
                numberOfDays: 6
            });
            expect(response.statusCode).to.be.equal(200);
        });
    })
});