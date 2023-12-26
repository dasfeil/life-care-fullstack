import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
    }
  }, [])
};
