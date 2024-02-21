import { useAuth } from "../../../api/auth/auth.store";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

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

        <h2>Log in to My ExpertPay to continue</h2>
        <button className="bg-white text-grey p-2 rounded-md w-full flex items-center border-">
          Login with Google
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
        <div>
          <input
            type="password"
            placeholder="Password"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <a href="#">Forgot your password?</a>
        <div>
          <button
            onClick={() => null}
            className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
          >
            Login
          </button>
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
