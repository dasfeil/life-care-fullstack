import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { handlePersist } from "../axios/instance";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      await handlePersist()
        .then(() => {
          isMounted && setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    !auth?.username && persist ? verifyToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};
