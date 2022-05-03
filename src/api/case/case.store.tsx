import { createContext, useState } from "react";
import { IObjectKeys } from "api/iType";
import { BehaviorSubject } from "rxjs";
import { getCases, deleteCase, addCase, updateCase } from "./case.api";
import { useObservableState } from "observable-hooks";

export interface Case extends IObjectKeys{
  caseNumber: string;
  ncpName?: string;
  children?: string[];
}

export interface CaseFormType {
  caseNumber: string,
  ncpName?: string,
  children?: string[]|any
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
    deleteCase,
    addCase,
    updateCase,
  };
};

export type UseCaseType = ReturnType<typeof useCase>;

const CaseContext = createContext<UseCaseType | null>(null);

export const CaseContextProvider: React.FunctionComponent = ({ children }) => (
  <CaseContext.Provider value={useCase([])}>{children}</CaseContext.Provider>
);
