import { get, del, post, patch } from "../baseApi";
import { Bank, BankFormType } from "./bank.store";
import resolveBankName from "./resolveBankName";

export async function getBanks() {
  return get(`banks.json`);
}

export async function deleteBank(id: string | null) {
  if (id === null || id === "") {
    return;
  }
  return del(`banks/${id}.json`);
}

export async function addBank(bank: BankFormType) {
  let bankData: Bank = {
    name: await resolveBankName(bank.rountingNumber),
    type: bank.accountType,
    rountinnum: bank.rountingNumber,
    accountnum: bank.accountNumber,
    verified: false,
  };
  return post("banks.json", bankData);
}

export async function updateBank(key: string, data: any) {
  return patch(`banks/${key}.json`, data);
}
