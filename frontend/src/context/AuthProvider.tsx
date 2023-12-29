import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthResponse } from "../types";
import { handleCookieToken } from "../axios/instance";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  auth: AuthResponse | undefined;
  setAuth: (state: AuthResponse | undefined) => void;
};

const initialValues: IAuthContext = {
  auth: undefined,
  setAuth: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValues);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    handleCookieToken()
      .then((res) => {
        isMounted && setAuth({ ...res.data });
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Not authenticated");
        setIsLoading(false)
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
