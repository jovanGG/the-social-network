import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DELETE_LIKE_STATUS_KEY,
  SEND_LIKE_STATUS_KEY,
  deleteLikeStatusApi,
  sendLikeStatusApi,
  FETCH_POSTS_KEY,
} from "../utils/api";
import { Post, PostsApiRepsonse } from "../utils/types";

const useSendLikeStatus = (post_id: string) => {
  const queryClient = useQueryClient();

  const { mutate: sendLikeStatus, isLoading: isLikeStatusSending } =
    useMutation(
      [SEND_LIKE_STATUS_KEY, post_id],
      () => sendLikeStatusApi(post_id),
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
                if (post.post_id === post_id) {
                  return {
                    ...post,
                    liked: true,
                    likes: post.likes + 1,
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
      }
    );

  const { mutate: deleteLikeStatus, isLoading: isUnlikeStatusSending } =
    useMutation(
      [DELETE_LIKE_STATUS_KEY, post_id],
      () => deleteLikeStatusApi(post_id),
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
                if (post.post_id === post_id) {
                  return {
                    ...post,
                    liked: false,
                    likes: post.likes - 1,
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
      }
    );

  const sendLikeOrUnlike = (shouldUnlike: boolean) => {
    if (shouldUnlike) {
      return deleteLikeStatus();
    }
    return sendLikeStatus();
  };

  return {
    sendLikeOrUnlike,
    isLikeStatusSending,
    isUnlikeStatusSending,
  };
};

export default useSendLikeStatus;
