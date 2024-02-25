import { useAuth } from "../../../api/auth/auth.store";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";
import GoogleIcon from "../../../assets/images/googleIcon.svg"; 

export default function LoginContainer() {
  const { handleSignInWithGoogle, handleSignOut, isLogin, userData } =
    useAuth(null);
  const navigation = useNavigate();

  if (isLogin) {
    navigation("/");
  }

  return (
    <>
      <div className={classes.box}>
        <h1 className={classes.login}>Login</h1>

        <div className="px-8 py-2">
          <h2 className="text-2xl">Welcome back</h2>
          <button
            className={classes.googleBtn+" rounded-md w-full flex items-center border border-gray-300 mb-4 mt-3"}
            onClick={handleSignInWithGoogle}
          >
            <img src={GoogleIcon} alt="google" className="w-6 h-6 mr-2" />
            Sign in Google
          </button>

          <div className="flex items-center mb-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username or Email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              className="mt-2 p-2 w-full border rounded-md"
            />
          </div>
          <a href="#" >Forgot your password?</a>
          <div className="mt-2">
            <button
              onClick={() => null}
              className="rounded-md w-full mb-4 btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/*
      <div>{ isLogin && (<>User logged in</>) }</div>
      <div>{ !isLogin && (<>User logged out</>) }</div>
      <div>{userData?.uid}</div>

      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
*/}
    </>
  );
}
