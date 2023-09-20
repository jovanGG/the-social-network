import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { FETCH_USER_KEY, fetchUserApi } from "../utils/api";
import axios from "../../../config/axios";
import { AuthContext } from "./context";
import { User } from "../utils/types";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const storedToken = localStorage.getItem("token") || undefined;

  const [token, setToken] = useState<string | undefined>(storedToken);

  useQuery<User>([FETCH_USER_KEY], fetchUserApi, {
    enabled: !!token,
  });

  const handleAccessToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user: queryClient.getQueryData([FETCH_USER_KEY]),
        handleAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
