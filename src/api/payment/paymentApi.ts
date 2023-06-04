import { get, del } from "../baseApi";
import { PaymentInterface } from "./paymentInterface";

/**
 * Retrieves a list of payments.
 * @returns A Promise that resolves to an array of PaymentInterface objects.
 * @example
 * getPayments().then(payments => {
 *   console.log(payments);
 * });
 */
function getPayments():Promise<PaymentInterface[]> {
  return get("payments.json");
}

/**
 * Deletes a payment with the specified ID.
 * @param id The ID of the payment to delete.
 * @returns A Promise that resolves to an array of PaymentInterface objects.
 * @example
 * deletePayment(1).then(payments => {
 *   console.log(payments);
 * });
 */
function deletePayment(id:number):Promise<PaymentInterface[]> {
  return del(`payments/${id}`);
}

export { getPayments, deletePayment }