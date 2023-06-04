import { get, del, post, patch } from "../baseApi";
import { Bank, BankFormType } from "./bankInterface";
import resolveBankName from "./resolveBankName";

async function getBanks() {
  return get(`banks.json`);
}

async function deleteBank(id: string | null) {
  if (id === null || id === "") {
    return;
  }
  return del(`banks/${id}.json`);
}

async function addBank(bank: BankFormType) {
  let bankData: Bank = {
    name: await resolveBankName(bank.rountingNumber),
    type: bank.accountType,
    rountinnum: bank.rountingNumber,
    accountnum: bank.accountNumber,
    verified: false,
  };
  return post("banks.json", bankData);
}

async function updateBank(key: string, data: any) {
  return patch(`banks/${key}.json`, data);
}

export { getBanks, deleteBank, addBank, updateBank };
