import { ReactNode, createContext, useState } from "react";
import { authResponse } from "../types";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  auth: authResponse | undefined;
  setAuth: (state: authResponse) => void;
};

const initialValues: IAuthContext = {
  auth: undefined,
  setAuth: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValues);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<authResponse>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
