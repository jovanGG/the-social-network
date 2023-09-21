export interface Post {
  post_id: string;
  user_id: string;
  text: string;
  image: string;
  audio?: string;
  comments: number;
  likes: number;
  created_at: string;
  user: {
    username: string;
    full_name: string;
    picture: string;
  };
  liked: boolean;
}

export interface PostComment {
  comment_id: string;
  text: string;
  created_at: string;
  username: string;
  full_name: string;
  picture: string;
}

export interface SendCommentRequest {
  text: string;
}

export interface SendPostRequest {
  text: string;
  audio?: Blob;
}

export interface PostCommentResponse {
  status: string;
  comments: PostComment[];
}

export interface PostsApiRepsonse {
  status: string;
  posts: Post[];
}

export interface ApiResponseError {
  error: {
    message: string;
  };
  status: number;
}
