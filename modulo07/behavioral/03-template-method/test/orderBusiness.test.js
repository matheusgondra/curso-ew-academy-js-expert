import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe("Test suite for Template Method design pattern", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});

	describe("#OrderBusiness", () => {
		test("execution Order Business without Template Method", () => {
			const order = new Order({
				customerId: 1,
				amount: 100.0,
				products: [{ descrition: "ferrari" }]
			});

			const orderBusiness = new OrderBusiness();

			const isValid = orderBusiness._validateRequiredFields(order);
			const result = orderBusiness._create(order);

			expect(isValid).toBe(true);
			expect(result).toBe(true);
		});

		test("execution Order Business with Template Method", () => {
			const order = new Order({
				customerId: 1,
				amount: 100.0,
				products: [{ descrition: "ferrari" }]
			});

			const orderBusiness = new OrderBusiness();
			const calledValidationfn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name);
			const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name);

			const result = orderBusiness.create(order);

			expect(result).toBe(true);
			expect(calledValidationfn).toHaveBeenCalled();
			expect(calledCreateFn).toHaveBeenCalled();
		});
	});
});
