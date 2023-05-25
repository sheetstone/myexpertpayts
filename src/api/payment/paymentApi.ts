import { baseUrl, onSuccess } from "../baseApi";
import { PaymentInterface } from "./paymentInterface";

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
