const { describe, it } = require("mocha");
const { expect } = require("chai");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util", () => {
    it("#evaluateRegex should throw an error using an unsafe regex", () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`);
    });

    it("#evaluateRegex should return the regex if it is safe", () => {
        const safeRegex = /^[a-z]/;
        expect(() => evaluateRegex(safeRegex)).to.not.throw();
        expect(evaluateRegex(safeRegex)).to.be.ok;
    });
});