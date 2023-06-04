export interface Bank {
  accountnum: string;
  name: string;
  rountinnum: string;
  type: "checking" | "saving";
  verified: boolean;
}

export interface BankFormType {
  rountingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountType: "checking" | "saving";
}

export interface BankData{
  [key: string]: Bank;
}
