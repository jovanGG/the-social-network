import { useQuery } from "@tanstack/react-query";

import { FETCH_POST_KEY, fetchPostApi } from "../utils/api";
import { PostApiRepsonse } from "../utils/types";

const useFetchPost = (postId: string) => {
  const {
    data,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = useQuery<PostApiRepsonse>(
    [FETCH_POST_KEY, postId],
    () => fetchPostApi(postId),
    {
      enabled: !!postId,
    }
  );

  return {
    post: data?.post,
    isLoadingPost,
    isErrorPost,
  };
};

export default useFetchPost;
