import { onSuccess, baseUrl } from "./baseApi";

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

export function getPayments() {
  return get("payments.json");
}
export function deletePayment(id:number) {
  return del(`payments/${id}`);
}

function get(url:string):Promise<PaymentInterface[]> {
  return fetch(baseUrl + url).then(onSuccess);
}

function del(url:string) {
  const request = new Request(baseUrl + url, {
    method: "DELETE",
  });

  return fetch(request).then(onSuccess);
}
