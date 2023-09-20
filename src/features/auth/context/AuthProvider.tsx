import { ReactNode, useState } from "react";

import axios from "../../../config/axios";
import { AuthContext } from "./context";
import useFetchUser from "../hooks/useFetchUser";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedToken = localStorage.getItem("token") || undefined;

  const [token, setToken] = useState<string | undefined>(storedToken);

  const { user } = useFetchUser(Boolean(token));

  const handleAccessToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, user, handleAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
