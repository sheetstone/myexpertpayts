import { createContext, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { useObservableState } from "observable-hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../api/Firebase/firebase.config";
import { User } from "firebase/auth";

export const rawBanksData$ = new BehaviorSubject<User | null>(null);

export const useAuth = (initial: User | null) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const auth = getAuth(app);
    const [userId, setUserId] = useState<string>('');

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsLogin(true);
        setUserId(user.uid);
        // ...
      } else {
        setIsLogin(false);
        setUserId('');
        // User is signed out
        // ...
      }
    });

    return{
        isLogin,
        userId
    }
};

export type UseAuthType = ReturnType<typeof useAuth>;

const AuthContext = createContext<UseAuthType | null>(null);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => (
  <AuthContext.Provider value={useAuth(null)}>{children}</AuthContext.Provider>
);
