import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { getAuth } from "firebase/auth";

export const handleGoogleLogin = async () => {
  const provider = await new GoogleAuthProvider();
  const auth = getAuth(app);

  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth.useDeviceLanguage();
  setPersistence(auth, indexedDBLocalPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithPopup(auth, provider);
    })
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token, user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const handleLogout = () => {
    const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
};
