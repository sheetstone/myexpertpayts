import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { useObservableState } from "observable-hooks";
import { User } from "firebase/auth";

export const rawBanksData$ = new BehaviorSubject<User | null>(null);

export const useAuth = (initial: User | null) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return{
        isLogin
    }
};

export type UseAuthType = ReturnType<typeof useAuth>;

const AuthContext = createContext<UseAuthType | null>(null);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => (
  <AuthContext.Provider value={useAuth(null)}>{children}</AuthContext.Provider>
);
