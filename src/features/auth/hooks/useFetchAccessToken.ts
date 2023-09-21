import { useMutation } from "@tanstack/react-query";

import { FETCH_ACCESS_TOKEN_KEY, fetchAccessTokenApi } from "../utils/api";
import { LoginRequest } from "../utils/types";

const useFetchAccessToken = () => {
  const { error, mutate: fetchToken, isLoading: isFetchingToken } = useMutation(
    (data: LoginRequest) => fetchAccessTokenApi(data),
    {
      mutationKey: [FETCH_ACCESS_TOKEN_KEY],
    }
  );

  return {
    error,
    fetchToken,
    isFetchingToken,
  };
};

export default useFetchAccessToken;
