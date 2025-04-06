import { expect, describe, test, jest, beforeAll } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject";
import Payment from "../src/events/payment";
import Shipment from "../src/observers/shipment";
import Marketing from "../src/observers/marketing";

describe("Test Suite for Observer Pattern", () => {
	beforeAll(() => {
		jest.spyOn(console, console.log.name).mockImplementation(() => {});
	})

	test("#PaymentSubject notify observers", () => {
		const subject = new PaymentSubject();
		const observer = {
			update: jest.fn()
		};
		const data = "hello world";
		const expected = data;

		subject.subcribe(observer);
		subject.notify(data);

		expect(observer.update).toBeCalledWith(expected);
	});

	test("#PaymentSubject should not notify unsubscribed observers", () => {
		const subject = new PaymentSubject();
		const observer = {
			update: jest.fn()
		};
		const data = "hello world";

		subject.subcribe(observer);
		subject.unsubscribe(observer);
		subject.notify(data);

		expect(observer.update).not.toBeCalled();
	});

	test("#Payment should notify subject after a credit card transaction", () => {
		const subject = new PaymentSubject();
		const payment = new Payment(subject);

		const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);

		const data = { userName: "erickwendel", id: Date.now() };
		payment.creditCard(data);

		expect(paymentSubjectNotifySpy).toBeCalledWith(data);
	});

	test("#All should notify observers after a credit card transaction", () => {
		const subject = new PaymentSubject();
		const shipment = new Shipment();
		const marketing = new Marketing();	
		
		const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
		const marketingSpy = jest.spyOn(marketing, marketing.update.name);
		
		subject.subcribe(shipment);
		subject.subcribe(marketing);
		
		const payment = new Payment(subject);
		const data = { userName: "erickwendel", id: Date.now() };
		payment.creditCard(data);

		expect(shipmentSpy).toBeCalledWith(data);
		expect(marketingSpy).toBeCalledWith(data);
	});	
});