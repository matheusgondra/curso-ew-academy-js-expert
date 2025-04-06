import Payment from "./events/payment.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";

const subject = new PaymentSubject();
const marketing = new Marketing();
subject.subcribe(marketing);

const shipment = new Shipment();
subject.subcribe(shipment);

const payment = new Payment(subject);
payment.creditCard({ userName: "erickwendel", id: Date.now() });

subject.unsubscribe(marketing);
payment.creditCard({ userName: "mariazinha", id: Date.now() });