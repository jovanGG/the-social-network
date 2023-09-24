import { useQuery } from "@tanstack/react-query";

import { FETCH_POSTS_KEY, fetchPostsApi } from "../utils/api";
import { PostsApiRepsonse } from "../utils/types";

const useFetchPosts = () => {
  const {
    data,
    isError: isErrorPosts,
    isLoading: isLoadingPosts,
  } = useQuery<PostsApiRepsonse>([FETCH_POSTS_KEY], fetchPostsApi);

  return {
    posts: data?.posts,
    isLoadingPosts,
    isErrorPosts,
  };
};

export default useFetchPosts;
