const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("node:assert");

const dbData = [{ name: "Mariazinha" }, { name: "Joazinho" }];

class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
}

rewiremock(() => require("../src/util/database")).with(MockDatabase);

(async () => {
    {
        const expected = [{ name: "MARIAZINHA" }, { name: "JOAZINHO" }];
        rewiremock.enable();

        const UserFactory = require("../src/factory/userFactory");

        const userService = await UserFactory.createInstance();
        const result = await userService.find();
        deepStrictEqual(result, expected);

        rewiremock.disable();
    }
    {
        const expected = [{ name: "ERICKWENDEL" }];

        const UserFactory = require("../src/factory/userFactory");

        const userService = await UserFactory.createInstance();
        const result = await userService.find();
        deepStrictEqual(result, expected);
    }
})();