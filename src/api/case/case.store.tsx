import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { getCases, deleteCase, addCase, updateCase } from "./case.api";
import { useObservableState } from "observable-hooks";

export interface Child {
  childName: string;
}
export interface Case {
  caseNumber: string;
  ncpName: string;
  children: Child[];
}

export interface CaseFormType {
  rountingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountType: "checking" | "saving";
}

export const rawCaseData$ = new BehaviorSubject<Case[]>([]);

export const useCase = (inital: any) => {
  const [error, setError] = useState<any>([]);
  const caseData = useObservableState<any>(rawCaseData$, []);

  async function loadCase() {
    console.log("Case load Called");
    try {
      const result = await getCases();
      rawCaseData$.next(result);
      return { success: true };
    } catch (error) {
      setError(error);
      return { success: false };
    }
  };

  return {
    caseData,
    loadCase,
    error,
    deleteCase
  };
};

export type UseCaseType = ReturnType<typeof useCase>;

const CaseContext = createContext<UseCaseType | null>(null);

export const CaseContextProvider: React.FunctionComponent = ({ children }) => (
  <CaseContext.Provider value={useCase([])}>{children}</CaseContext.Provider>
);
