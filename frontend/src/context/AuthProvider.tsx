import { ReactNode, createContext, useState } from "react";
import { authResponse } from "../types";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  auth: authResponse | undefined;
  setAuth: (state: authResponse) => void;
  persist: boolean;
  setPersist: (state: boolean) => void;
};

const initialValues: IAuthContext = {
  auth: undefined,
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValues);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<authResponse>();

  const [persist, setPersist] = useState(false);
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
