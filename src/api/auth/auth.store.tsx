import {
  GoogleAuthProvider,
  User,
  getAuth,
  indexedDBLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import app from "../../api/Firebase/firebase.config";

export const rawUserData$ = new BehaviorSubject<User | null>(null);

export const useAuth = (initial: User | null) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(initial);
    const [userId, setUserId] = useState<string>('');
    const auth = getAuth(app);


    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsLogin(true);
        setUserId(user.uid);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setIsLogin(false);
        setUserId('');
        setUser(null);
      }
    });

    useEffect(() => {
      return () => {
        unSubscribe();
      };
    }, [unSubscribe]);

    const handleSignIn = async () => {
      const provider = await new GoogleAuthProvider();
      const auth = getAuth(app);
    
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      auth.useDeviceLanguage();
      setPersistence(auth, indexedDBLocalPersistence)
        .then(() => {
          // New sign-in will be persisted with session persistence.
          return signInWithPopup(auth, provider);
        })
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log("Login successful", token, result.user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("Login failed", errorCode, errorMessage, email, credential);
        });
    }

    const handleSignOut = () => {
      const auth = getAuth(app);
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return{
        isLogin,
        userId,
        user,
        handleSignIn,
        handleSignOut
    }
};

export type UseAuthType = ReturnType<typeof useAuth>;

const AuthContext = createContext<UseAuthType | null>(null);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => (
  <AuthContext.Provider value={useAuth(null)}>{children}</AuthContext.Provider>
);
