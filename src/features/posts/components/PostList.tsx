import { Flex, Text } from "@chakra-ui/react";

import useFetchPosts from "../hooks/useFetchPosts";
import PostItem from "./PostItem";
import Loader from "./Loader";

const PostList = () => {
  const { posts, isLoadingPosts, isErrorPosts } = useFetchPosts();

  return (
    <Flex flexDir="column" py={8} gap={6}>
      {isLoadingPosts ? (
        <Loader />
      ) : isErrorPosts ? (
        <Text textStyle="h1">Error loading posts</Text>
      ) : (
        posts &&
        posts.map((post) => <PostItem key={post.post_id} post={post} />)
      )}
    </Flex>
  );
};

export default PostList;
