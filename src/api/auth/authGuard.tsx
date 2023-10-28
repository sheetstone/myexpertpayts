import { useAuth } from "./auth.store";
import { Navigate, useLocation } from "react-router-dom";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLogin, userData } = useAuth(null);
  const location = useLocation();

  console.log("AuthGuard", isLogin, userData);

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
