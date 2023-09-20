import { useQuery } from "@tanstack/react-query";

import { FETCH_USER_KEY, fetchUserApi } from "../utils/api";
import { User } from "../utils/types";

const useFetchUser = (shouldFetch: boolean) => {
  const { data: user, isLoading: isUserLoading } = useQuery<User>(
    [FETCH_USER_KEY],
    fetchUserApi,
    {
      enabled: shouldFetch,
    }
  );

  return {
    user,
    isUserLoading,
  };
};

export default useFetchUser;
