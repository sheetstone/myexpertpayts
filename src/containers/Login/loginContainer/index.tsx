import { useAuth } from "../../../api/auth/auth.store";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./login.module.scss";

export default function LoginContainer() {
  const { userId, handleSignIn, handleSignOut } = useAuth(null);

  return (
    <>
      <div>
        <h1>Login</h1>
        <button onClick={handleSignIn}>Sign In With Google</button>
      </div>

      <div>User loged in</div>
      <div>{userId}</div>

      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </>
  );
}
