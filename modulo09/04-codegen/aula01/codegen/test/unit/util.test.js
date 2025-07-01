import { expect, jest, describe, test, beforeEach } from "@jest/globals";
import Util from "../../src/util.js";

describe("#Util - Strings", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("#upperCaseFirstLetter should transform the first letter in uppercase", () => {
        const data = "hello";
        const expected = "Hello";
        const result = Util.upperCaseFirstLetter(data);
        expect(result).toBe(expected);
    });

    test("#lowerCaseFirstLetter should transform the first letter in lowercase", () => {
        const data = "Hello";
        const expected = "hello";
        const result = Util.lowerCaseFirstLetter(data);
        expect(result).toBe(expected);
    });
    
    test.todo("#lowerCaseFirstLetter given an empty string it should return empty");
    
    test.todo("#upperCaseFirstLetter given an empty string it should return empty");
});