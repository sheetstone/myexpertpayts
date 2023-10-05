import { useState } from "react";
import { handleGoogleLogin, handleLogout } from "api/auth/auth.api";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../api/Firebase/firebase.config";

export default function Login() {
  const auth = getAuth(app);
  const [userId, setUserId] = useState<string>('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUserId(user.uid);
      // ...
    } else {
      setUserId('');
      // User is signed out
      // ...
    }
  });
  return (
    <>
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Sign In With Google</button>
    </div>

    <div>User loged in</div>
    <div>{userId}</div>

    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
}
