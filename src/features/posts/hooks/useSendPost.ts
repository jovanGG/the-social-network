import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendPostApi, SEND_POST_KEY, FETCH_POSTS_KEY } from "../utils/api";

const useSendPost = () => {
  const queryClient = useQueryClient();

  const { mutate: sendPost, isLoading: isSendingPost } = useMutation(
    [SEND_POST_KEY],
    (data: FormData) => sendPostApi(data),
    {
      onSuccess: () => queryClient.invalidateQueries([FETCH_POSTS_KEY]),
    }
  );

  return {
    sendPost,
    isSendingPost,
  };
};

export default useSendPost;
