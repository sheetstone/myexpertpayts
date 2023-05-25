import { baseUrl, onSuccess } from "./baseApi";

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

/**
 *  
 * @returns Promise<PaymentInterface[]>
 * @example
 * getPayments().then(payments => {
 * console.log(payments);
 * });
 */
export function getPayments():Promise<PaymentInterface[]> {
  return get("payments.json");
}

/**
 *  
 * @param id
 * @returns Promise<PaymentInterface[]>
 * @example
 * deletePayment(1).then(payments => {
 * console.log(payments);
 * });
 */
export function deletePayment(id:number):Promise<PaymentInterface[]> {
  return del(`payments/${id}`);
}

function get(url:string):Promise<PaymentInterface[]> {
  return fetch(baseUrl + url).then(onSuccess);
}

function del(url:string):Promise<PaymentInterface[]> {
  const request = new Request(baseUrl + url, {
    method: "DELETE",
  });

  return fetch(request).then(onSuccess);
}
