import { useAuth } from "../../../api/auth/auth.store";

export default function LoginContainer() {
  const { handleSignIn, handleSignOut, isLogin, userData } = useAuth(null);

  return (
    <>
      <div>
        <h1>Login</h1>
        <button onClick={handleSignIn}>Sign In With Google</button>
      </div>

      <div>{ isLogin && (<>User logged in</>) }</div>
      <div>{ !isLogin && (<>User logged out</>) }</div>
      <div>{userData?.uid}</div>

      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </>
  );
}
