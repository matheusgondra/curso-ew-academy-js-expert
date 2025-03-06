import { describe, it } from "mocha";
import { expect } from "chai";
import { Person } from "../src/person.js";

describe("Person", () => {
    it("should return a person instance from a string", () => {
        const person = Person.generateInstance("1 Bike,Carro 2000 2020-01-01 2020-01-02");
        const expected = {
            id: "1",
            vehicles: ["Bike", "Carro"],
            from: "2020-01-01",
            to: "2020-01-02",
            kmTraveled: "2000"
        };

        expect(person).to.be.deep.equal(expected);
    });

    it("should format values", () => {
        const person = Person.generateInstance("1 Bike,Carro 2000 2020-01-01 2020-01-02");
        const result = person.formatted("pt-BR");
        const expected = {
            id: 1,
            vehicles: "Bike e Carro",
            kmTraveled: "2.000 km",
            from: "01 de janeiro de 2020",
            to: "02 de janeiro de 2020"
        };

        expect(result).to.be.deep.equal(expected);
    });
});