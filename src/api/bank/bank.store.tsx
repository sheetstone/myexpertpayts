import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { addBank, getBanks, deleteBank, updateBank } from "./bank.api";
import { useObservableState } from "observable-hooks"

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

export const rawBanksData$ = new BehaviorSubject<Bank[]>([]);

export const useBanks = (inital: any) => {
  const [error, setError] = useState<any>([]);
  const [showEditBank, setShowEditBank] = useState<boolean>(false);
  const bankData = useObservableState<any>(rawBanksData$, []);

  async function loadBank() {
    console.log("Bank load Called");
    try {
      const result = await getBanks();
      rawBanksData$.next(result);
      return { success: true };
    } catch (error){
      setError(error);
      return { success: false};
    }
  }
  
  return {
    bankData,
    showEditBank,
    error,
    toggleEditBank(open: boolean) {
      setShowEditBank(open);
    },
    async addBank(data: BankFormType) {
      await addBank(data);
    },
    loadBank: loadBank,
    async delBank(key: string) {
      await deleteBank(key);
      loadBank();
    },
    async verifyBank(key: string) {
      const newBankItem = { ...bankData[key] };
      newBankItem.verified = true;
      await updateBank(key, newBankItem);
      loadBank();
    },
  };
};

export type UseBanksType = ReturnType<typeof useBanks>;

const BankContext = createContext<UseBanksType | null>(null);

export const BankContextProvider: React.FunctionComponent = ({ children }) => (
  <BankContext.Provider value={useBanks([])}>{children}</BankContext.Provider>
);
