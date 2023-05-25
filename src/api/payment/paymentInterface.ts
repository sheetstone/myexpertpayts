/**
 * 
 * @interface PaymentInterface
 * @property {number} amount
 * @property {string} bank
 * @property {string} casenumber
 * @property {string} catgory
 * @property {number} id
 * @property {string} name
 * @property {string} paymentdate
 * @property {number} status
 * @example
 * {
 * "amount": 1000,
 * "bank": "SBI",
 * "casenumber": "123456789",
 * "catgory": "Food",
 * "id": 1,
 * "name": "Raj",
 * "paymentdate": "2021-05-05",
 * "status": 1
 * }
 */
export interface PaymentInterface {
    amount: number;
    bank: string;
    casenumber: string;
    catgory: string;
    id: number;
    name: string;
    paymentdate: string;
    status: number;
  }