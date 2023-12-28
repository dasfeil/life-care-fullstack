import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const exactUser = location.pathname == "/user";

  useEffect(() => {
    exactUser && navigate("/user/profile", { replace: true });
  });
  return <Outlet />;
}
