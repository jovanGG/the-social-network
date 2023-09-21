import axios from "axios";
import { API_BASE_URL } from "../../../config/constants";
import { SendCommentRequest } from "./types";

export const FETCH_POSTS_KEY = "fetchPostsKey";
export const fetchPostsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);

  return response.data;
};

export const FETCH_POST_KEY = "fetchPostKey";
export const fetchPostApi = async (postId: string) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);

  return response.data;
};

export const FETCH_POST_COMMENTS_KEY = "fetchPostCommentsKey";
export const fetchPostCommentsApi = async (postId: string) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);

  return response.data;
};

export const SEND_POST_COMMENT_KEY = "sendPostCommentKey";
export const sendPostCommentApi = async (
  postId: string,
  data: SendCommentRequest
) => {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`,
    data
  );

  return response.data;
};

export const SEND_LIKE_STATUS_KEY = "sendLikeStatusKey";
export const sendLikeStatusApi = async (postId: string) => {
  const response = await axios.post(`${API_BASE_URL}/posts/${postId}/like`);

  return response.data;
};

export const DELETE_LIKE_STATUS_KEY = "deleteLikeStatusKey";
export const deleteLikeStatusApi = async (postId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/like`);

  return response.data;
};

export const DELETE_POST_COMMENT_KEY = "deletePostCommentKey";
export const deletePostCommentApi = async (
  postId: string,
  commentId: string
) => {
  const response = await axios.delete(
    `${API_BASE_URL}/posts/${postId}/comments/${commentId}`
  );

  return response.data;
};

export const SEND_POST_KEY = "sendPostKey";
export const sendPostApi = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, data);

  return response.data;
};
