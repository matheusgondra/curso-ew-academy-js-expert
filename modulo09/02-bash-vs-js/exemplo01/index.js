const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const getFileName = index => index + 1 >= 3 ? `js-0${index}` : `mjs-0${index}`;

const rmFolder = (folderName) => rmSync(`./${folderName}`, { recursive: true });

const makeDirAndReturnName = (folderName) => {
    if (existsSync(folderName)) {
        rmFolder(folderName);
    }

    mkdirSync(folderName);
    
    return folderName;
}

const log = data => {
    console.log(data);
    return data;
}

const initializePackage = folderName => {
    execSync(`npm init -y --scope @dgondra --silent`, {
        cwd: `./${folderName}`
    });

    return folderName;
}

const printNameAndPackageVersion = folderName => {
    const { name, version } = require(`./${folderName}/package.json`);

    console.log({ n: name, v: version });

    return folderName;
}

const FOLDER_AMOUNT = 4;

Array.from(Array(FOLDER_AMOUNT).keys())
    .map(getFileName)
    .map(makeDirAndReturnName)
    .map(initializePackage)
    .map(printNameAndPackageVersion)
    .map(rmFolder);
