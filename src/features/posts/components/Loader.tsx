import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justifyContent="center" height="full" width="full" pt={10}>
      <Spinner speed=".4s" />
    </Flex>
  );
};

export default Loader;
