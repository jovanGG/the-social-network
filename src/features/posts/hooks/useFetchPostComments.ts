import { useQuery } from "@tanstack/react-query";

import { FETCH_POST_COMMENTS_KEY, fetchPostCommentsApi } from "../utils/api";
import { PostCommentResponse } from "../utils/types";

const useFetchPostComments = (post_id: string) => {
  const { data, isLoading: isCommentsLoading } = useQuery<PostCommentResponse>(
    [FETCH_POST_COMMENTS_KEY, post_id],
    () => fetchPostCommentsApi(post_id),
    {
      enabled: !!post_id,
    }
  );

  return {
    comments: data?.comments,
    isCommentsLoading,
  };
};

export default useFetchPostComments;
