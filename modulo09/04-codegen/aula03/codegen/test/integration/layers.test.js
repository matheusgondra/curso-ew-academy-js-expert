import { expect, jest, describe, test, beforeEach, beforeAll, afterAll } from "@jest/globals";
import { tmpdir } from "os";
import { join } from "path";
import fsPromises from "fs/promises";
import { createLayersIfNotExists } from "../../src/createLayers.js";

async function getFolders({ mainPath, defaultMainFolder }) {
    return fsPromises.readdir(join(mainPath, defaultMainFolder));
}

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
        const afterRun = await getFolders(config);

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });

    test("should not create folders if it doenst exists", async () => {
        const beforeRun = await getFolders(config);
        
        await createLayersIfNotExists(config);

        const afterRun = await getFolders(config);

        expect(afterRun).toEqual(beforeRun);
    });
});