/*
ProductId: should be between 2 and 20 characteres
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
	const errors = [];

	const isInvalidIdLength = product.id.length < 2 || product.id.length > 20;
	if (isInvalidIdLength) {
		errors.push(`id: invalid length, current [${product.id.length}] expected to be between 2 and 20`);
	}

	const noWordsOrNumbersRegex = /(\W|\d)/;
	const isInvalidName = noWordsOrNumbersRegex.test(product.name);
	if (isInvalidName) {
		errors.push(`name: invalid value, current [${product.name}] expected to be only words`);
	}

	const isInvalidPrice = product.price < 1 || product.price > 1000;
	if (isInvalidPrice) {
		errors.push(`price: invalid value, current [${product.price}] expected to be between 1 and 1000`);
	}

	const isInvalidCategory = !["electronic", "organic"].includes(product.category);
	if (isInvalidCategory) {
		errors.push(`category: invalid value, current [${product.category}] expected to be electronic or organic`);
	}

	return {
		result: errors.length === 0,
		errors
	};
}

module.exports = { productValidator };
