import React, { ReactElement, useEffect, FC } from "react";
import { useAuth } from "../../api/auth/auth.store";
import { Navigate, useLocation } from "react-router-dom";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLogin } = useAuth(null);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
