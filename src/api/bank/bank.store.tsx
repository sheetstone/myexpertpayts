import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { addBank, getBanks, deleteBank, updateBank } from "./bank.api";
import { useObservableState } from "observable-hooks";
import { BankFormType, BankData } from "./bankInterface";

export const rawBanksData$ = new BehaviorSubject<BankData>({});

// custom hook to use the bank store
/**
 * A custom hook that provides access to bank data and functions for manipulating it.
 * @param initial - The initial value for the bank data.
 * @returns An object containing bank data, error state, and functions for adding, deleting, and verifying banks.
 */
export const useBanks = (initial: BankData) => {
  const [error, setError] = useState<Error|unknown>(null);
  const [showEditBank, setShowEditBank] = useState<boolean>(false);
  const bankData = useObservableState<BankData>(rawBanksData$, {});

  /**
   * Loads bank data from the server and updates the observable.
   * @returns An object indicating whether the operation was successful.
   */
  async function loadBank(): Promise<{ success: boolean }> {
    try {
      const result = await getBanks();
      rawBanksData$.next(result);
      return { success: true };
    } catch (error) {
      setError(error);
      return { success: false };
    }
  }

  return {
    bankData,
    showEditBank,
    error,
    /**
     * Toggles the edit bank modal.
     * @param open - Whether to open or close the modal.
     */
    toggleEditBank(open: boolean) {
      setShowEditBank(open);
    },
    /**
     * Adds a new bank to the server.
     * @param data - The bank data to add.
     */
    async addBank(data: BankFormType) {
      await addBank(data);
    },
    /**
     * Loads bank data from the server.
     */
    loadBank: loadBank,
    /**
     * Deletes a bank from the server.
     * @param key - The key of the bank to delete.
     */
    async delBank(key: string) {
      await deleteBank(key);
      loadBank();
    },
    /**
     * Verifies a bank on the server.
     * @param key - The key of the bank to verify.
     */
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
  <BankContext.Provider value={useBanks({})}>{children}</BankContext.Provider>
);
