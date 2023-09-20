import axios from "axios";

import { API_BASE_URL } from "../../../config/constants";
import { LoginRequest } from "./types";

export const FETCH_ACCESS_TOKEN_KEY = "fetchAccessTokenKey";
export const fetchAccessTokenApi = async (data: LoginRequest) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);

  return response.data;
};

export const FETCH_USER_KEY = "fetchUserKey";
export const fetchUserApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/accounts/me`);

  return response.data;
};
