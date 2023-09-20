import { Flex } from "@chakra-ui/react";

import useFetchPosts from "../hooks/useFetchPosts";
import Post from "../components/Post";
import Loader from "../components/Loader";

const Home = () => {
  const { posts, isPostsLoading } = useFetchPosts();

  return isPostsLoading ? (
    <Loader />
  ) : (
    <Flex flexDir="column" py={8} gap={6}>
      {posts && posts.map((post) => <Post key={post.post_id} post={post} />)}
    </Flex>
  );
};

export default Home;
