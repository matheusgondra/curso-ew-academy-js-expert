class Database {
    #connectionString;

    constructor({ connectionString }) {
        this.#connectionString = connectionString;
    }

    async connect() {
        await this.#sleep(100);
        return this;
    }

    async find(query) {
        await this.#sleep(100);
        return [{ name: "ErickWendel" }];
    }

    async #sleep(miliseconds) {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    }
}

module.exports = Database;