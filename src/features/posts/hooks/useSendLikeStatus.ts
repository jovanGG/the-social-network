import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DELETE_LIKE_STATUS_KEY,
  SEND_LIKE_STATUS_KEY,
  deleteLikeStatusApi,
  sendLikeStatusApi,
  FETCH_POSTS_KEY,
} from "../utils/api";

const useSendLikeStatus = (post_id: string) => {
  const queryClient = useQueryClient();

  const { mutate: sendLikeStatus, isLoading: isLikeStatusSending } =
    useMutation(() => sendLikeStatusApi(post_id), {
      mutationKey: [SEND_LIKE_STATUS_KEY, post_id],
      onSuccess: () => queryClient.invalidateQueries([FETCH_POSTS_KEY]),
    });

  const { mutate: deleteLikeStatus, isLoading: isUnlikeStatusSending } =
    useMutation(() => deleteLikeStatusApi(post_id), {
      mutationKey: [DELETE_LIKE_STATUS_KEY, post_id],
      onSuccess: () => queryClient.invalidateQueries([FETCH_POSTS_KEY]),
    });

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
