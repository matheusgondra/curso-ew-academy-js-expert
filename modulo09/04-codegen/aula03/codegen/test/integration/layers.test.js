import { expect, jest, describe, test, beforeEach, beforeAll, afterAll } from "@jest/globals";
import { tmpdir } from "os";
import { join } from "path";
import fsPromises from "fs/promises";
import { createLayersIfNotExists } from "../../src/createLayers.js";

describe("#Integration - Layers - Folders Structure", () => {
    let tmpDirectory = "";
    const config = {
        defaultMainFolder: "src",
        mainPath: "",
        layers: ["service", "factory", "repository"].sort()
    }

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await fsPromises.rm(tmpDirectory, { recursive: true });
    });

    test("should not create folders if it exists", async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath);

        await createLayersIfNotExists(config);
        const afterRun = await fsPromises.readdir(join(config.mainPath, config.defaultMainFolder));

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });

    test.todo("should not create folders if it doenst exists");
});