import { createContext } from "react";

import { User } from "../utils/types";

export interface AuthContextProps {
  handleAccessToken: (token: string) => void;
  token: string | undefined;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
