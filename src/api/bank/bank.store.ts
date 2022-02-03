import { BehaviorSubject, Observable, defer } from "rxjs";
import { getBanks } from "./bankApi";

export interface Bank {
  accountnum: string;
  name: string;
  rountinnum: string;
  type: "checking" | "saving";
  verified: boolean;
}

export interface BankFormType {
  rountingNumber: string,
  accountNumber: string,
  confirmAccountNumber: string,
  accountType: "checking" | "saving"
}

export const rawBanksData$ = new BehaviorSubject<Bank[]>([]);

defer(async function(){
  return await getBanks();
})
.subscribe((data)=>{
  rawBanksData$.next(data)
})