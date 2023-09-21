import { Flex } from "@chakra-ui/react";

import useFetchPosts from "../hooks/useFetchPosts";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Loader from "../components/Loader";

const Home = () => {
  const { posts, isPostsLoading } = useFetchPosts();

  return (
    <Flex pt={8} flexDir="column">
      <PostForm />
      {isPostsLoading ? <Loader /> : posts && <PostList posts={posts} />}
    </Flex>
  );
};

export default Home;
