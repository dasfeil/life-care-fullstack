import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthResponse } from "../types";
import { handleCookieToken } from "../axios/instance";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  auth: AuthResponse | undefined;
  setAuth: (state: AuthResponse) => void;
};

const initialValues: IAuthContext = {
  auth: undefined,
  setAuth: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValues);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthResponse>();

  useEffect(() => {
    let isMounted = true;
    handleCookieToken()
      .then((res) => {
        isMounted && setAuth({ ...res.data });
      })
      .catch(console.log);
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
