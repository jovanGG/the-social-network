export interface Post {
  post_id: string;
  user_id: string;
  text: string;
  image: string;
  audio: string;
  comments: string;
  likes: string;
  created_at: string;
  user: {
    username: string;
    full_name: string;
    picture: string;
  };
  liked: boolean;
}

export interface PostsApiRepsonse {
  status: string;
  posts: Post[];
}
