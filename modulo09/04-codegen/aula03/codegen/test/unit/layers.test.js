import { expect, jest, describe, test, beforeEach } from "@jest/globals";
import { createLayersIfNotExists } from "../../src/createLayers.js"
import fsPromises from "fs/promises";
import fs from "fs";

describe("#Util - Strings", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("should create folders if it doesn't exist", async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

        const defaultLayers = ["service", "factory", "repository"];

        await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
    });

    test("should not create folders if it exists", async () => {
                jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

        const defaultLayers = ["service", "factory", "repository"];

        await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).not.toHaveBeenCalled();
    });
});