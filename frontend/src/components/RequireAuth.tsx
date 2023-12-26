import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Props = {
  allowedRoles: string[];
  redirect?: string;
};

export const RequireAuth = ({ allowedRoles, redirect }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate
      to={redirect ? redirect : "/"}
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
