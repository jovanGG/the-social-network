import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DELETE_LIKE_STATUS_KEY,
  SEND_LIKE_STATUS_KEY,
  deleteLikeStatusApi,
  sendLikeStatusApi,
  FETCH_POSTS_KEY,
  FETCH_POST_KEY,
} from "../utils/api";
import { Post, PostApiRepsonse, PostsApiRepsonse } from "../utils/types";

const useSendLikeStatus = (postId: string) => {
  const queryClient = useQueryClient();

  const { mutate: sendLikeStatus, isLoading: isLikeStatusSending } =
    useMutation(
      [SEND_LIKE_STATUS_KEY, postId],
      () => sendLikeStatusApi(postId),
      {
        onMutate: async () => {
          await queryClient.cancelQueries([FETCH_POSTS_KEY]);

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

          queryClient.setQueryData(
            [FETCH_POST_KEY, postId],
            (oldData: PostApiRepsonse | undefined) => {
              if (!oldData) {
                return oldData;
              }

              const updatedPost = {
                ...oldData.post,
                liked: true,
                likes: oldData.post.likes + 1,
              };

              return { ...oldData, post: updatedPost };
            }
          );
        },
      }
    );

  const { mutate: deleteLikeStatus, isLoading: isUnlikeStatusSending } =
    useMutation(
      [DELETE_LIKE_STATUS_KEY, postId],
      () => deleteLikeStatusApi(postId),
      {
        onMutate: async () => {
          await queryClient.cancelQueries([FETCH_POSTS_KEY]);

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

          queryClient.setQueryData(
            [FETCH_POST_KEY, postId],
            (oldData: PostApiRepsonse | undefined) => {
              if (!oldData) {
                return oldData;
              }

              const updatedPost = {
                ...oldData.post,
                liked: false,
                likes: oldData.post.likes - 1,
              };

              return { ...oldData, post: updatedPost };
            }
          );
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
