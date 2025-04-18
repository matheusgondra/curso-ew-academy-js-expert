const { readFile } = require('fs/promises');
const { error } = require('./constants');

const DEFAULT_OPTION = {
	maxLine: 3,
	fields: ["id", "name", "profession", "age"]
}

class File {
	static async csvToJson(filePath) {
		const content = await readFile(filePath, "utf8");
		const validation = await this.isValid(content); 
		if (!validation.valid) {
			throw new Error(validation.error);
		}

		const result = this.parseCSVToJSON(content);
		return result;
	}

	static async isValid(csvString, options = DEFAULT_OPTION) {
		const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/);
		const isHeaderValid = headers === options.fields.join(",");
		if (!isHeaderValid) {
			return {
				error: error.FILE_FIELDS_ERROR_MESSAGE,
				valid: false
			};
		}

		if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLine) {
			return {
				error: error.FILE_LENGTH_ERROR_MESSAGE,
				valid: false
			};
		}

		return { valid: true };
	}

	static parseCSVToJSON(csvString) {
		const lines = csvString.split(/\r?\n/);
		const firstLine = lines.shift();
		const header = firstLine.split(",");

		const users = lines.map(line => {
			const columns = line.split(",");
			const user = {};

			for (const index in columns) {
				user[header[index]] = columns[index].trim();
			}

			return user;
		});

		return users;
	}
}

module.exports = File;