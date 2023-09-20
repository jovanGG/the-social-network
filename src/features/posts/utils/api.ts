import axios from "axios";
import { API_BASE_URL } from "../../../config/constants";

export const FETCH_POSTS_KEY = "fetchPostsKey";
export const fetchPostsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);

  return response.data;
};

export const FETCH_POST_KEY = "fetchPostKey";
export const fetchPostApi = async (post_id: string) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${post_id}`);

  return response.data;
};

export const SEND_LIKE_STATUS_KEY = "sendLikeStatusKey";
export const sendLikeStatusApi = async (post_id: string) => {
  const response = await axios.post(`${API_BASE_URL}/posts/${post_id}/like`);

  return response.data;
};

export const DELETE_LIKE_STATUS_KEY = "deleteLikeStatusKey";
export const deleteLikeStatusApi = async (post_id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${post_id}/like`);

  return response.data;
};
