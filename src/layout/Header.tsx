import { Text, Flex } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      borderBottomColor="grey-2.500"
      borderBottomStyle="solid"
      borderBottomWidth={1}
      alignItems="end"
      height="80px"
      px={8}
      py={4}
    >
      <Text color="black.500" fontWeight="black">
        Home
      </Text>
    </Flex>
  );
};

export default Header;
