import { Flex } from "@chakra-ui/react";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

const Home = () => {
  return (
    <Flex pt={{ base: 0, md: 8 }} flexDir="column">
      <PostForm />
      <PostList />
    </Flex>
  );
};

export default Home;
