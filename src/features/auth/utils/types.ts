export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  status: string;
  account: {
    username: string;
    email: string;
    full_name: string;
    picture: string;
  };
}

export interface ErrorResponse {
  error: {
    message: string;
  };
  status: string;
}
