import { Flex } from "@chakra-ui/react";

import { Post } from "../utils/types";
import PostItem from "./PostItem";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Flex flexDir="column" py={8} gap={6}>
      {posts &&
        posts.map((post) => <PostItem key={post.post_id} post={post} />)}
    </Flex>
  );
};

export default PostList;
