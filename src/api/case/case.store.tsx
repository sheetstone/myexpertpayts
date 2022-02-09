import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { getCases, deleteCase, addCase, updateCase } from "./case.api";
import { useObservableState } from "observable-hooks";

export interface Child{
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
  const caseDate = useObservableState<any>(rawCaseData$, []);

  return {
    caseDate,
    rawCaseData$,
    error
  };
};

export type UseCaseType = ReturnType<typeof useCase>;

const BankContext = createContext<UseCaseType | null>(null);

export const BankContextProvider: React.FunctionComponent = ({ children }) => (
  <BankContext.Provider value={useBanks([])}>{children}</BankContext.Provider>
);
