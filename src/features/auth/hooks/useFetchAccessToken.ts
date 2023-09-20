import { useMutation } from "@tanstack/react-query";

import { FETCH_ACCESS_TOKEN_KEY, fetchAccessTokenApi } from "../utils/api";
import { LoginRequest } from "../utils/types";

const useFetchAccessToken = () => {
  const { mutate: fetchToken, isLoading: isFetchingToken } = useMutation(
    (data: LoginRequest) => fetchAccessTokenApi(data),
    {
      mutationKey: [FETCH_ACCESS_TOKEN_KEY],
    }
  );

  return {
    fetchToken,
    isFetchingToken,
  };
};

export default useFetchAccessToken;
