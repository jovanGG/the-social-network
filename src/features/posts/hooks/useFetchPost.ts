import { useQuery } from "@tanstack/react-query";

import { FETCH_POST_KEY, fetchPostApi } from "../utils/api";
import { Post } from "../utils/types";

const useFetchPosts = (post_id: string) => {
  const { data: post, isLoading: isPostLoading } = useQuery<Post>(
    [FETCH_POST_KEY],
    () => fetchPostApi(post_id)
  );

  return {
    post,
    isPostLoading,
  };
};

export default useFetchPosts;
