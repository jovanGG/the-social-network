import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/context";

const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};

export default useAuth;
