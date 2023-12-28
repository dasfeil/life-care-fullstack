import { useEffect } from "react";
import { handleLogout } from "../axios/instance";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import useAuth from "../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { setAuth } = useAuth();
  useEffect(() => {
    handleLogout()
      .then(() => {
        setAuth({ username: "", email: "", id: Infinity, roles: [] });
        navigate("/", {replace: true});
      })
      .catch(() =>
        showBoundary(new Error("Unexpected error, please try again later"))
      );
  }, []);
  return <p>Loading...</p>;
}
