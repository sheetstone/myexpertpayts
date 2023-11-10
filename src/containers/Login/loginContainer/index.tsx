import { useAuth } from "../../../api/auth/auth.store";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

export default function LoginContainer() {
  const { handleSignIn, handleSignOut, isLogin, userData } = useAuth(null);
  const navigation = useNavigate();

  if(isLogin){
    navigation('/');
  }

  return (
    <>
      <div className={classes.box}>
        <h1 className={classes.login}>Login</h1>
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
