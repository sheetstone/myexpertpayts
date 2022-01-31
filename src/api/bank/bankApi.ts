
import { onSuccess, get, del, post, patch } from "../baseApi";
import resolveBankName from "./resolveBankName";


export async function getBanks() {
  return get(`banks.json`);
}

export async function deleteBank(id: string) {
  if (id === null || id === "") {
    return;
  }
  return del(`banks/${id}.json`);
}

export async function addBank(bank: any) {
  let bankData = {
    ...bank,
    name: await resolveBankName(bank.rountingNumber),
    type: bank.accountnum,
    rountinnum: bank.rountingNumber,
    accountnum: bank.accountNumber,
    verified: false
  };
  return post("banks.json", bankData);
}

export async function updateBank(key:string, data:any) {
  return patch(`banks/${key}.json`, data);
}

