import React from "react";
import { useAuth } from "./auth.store";
import { Navigate, useLocation } from "react-router-dom";

export const UnAuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLogin } = useAuth(null);
  const location = useLocation();

  console.log("UnAuthGuard", isLogin);

  if (isLogin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
