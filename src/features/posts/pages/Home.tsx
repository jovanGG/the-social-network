import { Flex } from "@chakra-ui/react";

import useFetchPosts from "../hooks/useFetchPosts";
import Post from "../components/Post";

const Home = () => {
  const { posts, isPostsLoading } = useFetchPosts();

  return isPostsLoading ? (
    <p>loading</p>
  ) : (
    <Flex flexDir="column" gap={6}>
      {posts && posts.map((post) => <Post key={post.post_id} post={post} />)}
    </Flex>
  );
};

export default Home;
