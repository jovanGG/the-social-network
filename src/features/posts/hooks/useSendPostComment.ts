import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  FETCH_POST_COMMENTS_KEY,
  SEND_POST_COMMENT_KEY,
  sendPostCommentApi,
  FETCH_POSTS_KEY,
} from "../utils/api";
import { SendCommentRequest, PostsApiRepsonse, Post } from "../utils/types";

const useSendPostComment = (postId: string) => {
  const queryClient = useQueryClient();

  const { mutate: sendComment, isLoading: isSendingComment } = useMutation(
    [SEND_POST_COMMENT_KEY],
    (data: SendCommentRequest) => sendPostCommentApi(postId, data),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([FETCH_POSTS_KEY]);

        const previousPosts = queryClient.getQueryData([FETCH_POSTS_KEY]);

        queryClient.setQueryData(
          [FETCH_POSTS_KEY],
          (oldData: PostsApiRepsonse | undefined) => {
            if (!oldData) {
              return oldData;
            }

            const updatedPosts = oldData.posts.map((post: Post) => {
              if (post.post_id === postId) {
                return {
                  ...post,
                  comments: post.comments + 1,
                };
              } else {
                return post;
              }
            });

            return { ...oldData, posts: updatedPosts };
          }
        );
        return { previousPosts };
      },
      onSuccess: () =>
        queryClient.invalidateQueries([FETCH_POST_COMMENTS_KEY, postId]),
    }
  );

  return {
    sendComment,
    isSendingComment,
  };
};

export default useSendPostComment;
