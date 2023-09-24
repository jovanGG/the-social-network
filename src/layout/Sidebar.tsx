import { Button, Image, Flex } from "@chakra-ui/react";
import { FaHouse } from "react-icons/fa6";

import constel from "/constel.svg";

const Sidebar = () => {
  return (
    <Flex
      alignItems={{ base: "center", md: "baseline" }}
      py={{ base: 4, md: 8 }}
      px={4}
      flexDir="column"
      width="full"
      gap={12}
    >
      <Image h="32px" w="32px" src={constel} alt="Constellation" />

      <Flex display={{ base: "none", md: "flex" }}>
        <Button
          leftIcon={<FaHouse />}
          colorScheme="blue"
          variant="link"
          size="md"
        >
          Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
