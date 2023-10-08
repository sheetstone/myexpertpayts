import { useState } from "react";
import { useAuth } from "../../api/auth/auth.store";
import { handleGoogleLogin, handleLogout } from "api/auth/auth.api";

export default function Login() {
  const { userId } = useAuth(null); 

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
