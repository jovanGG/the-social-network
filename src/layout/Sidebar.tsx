import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Flex } from "@chakra-ui/react";

import constel from "../assets/constel.svg";

const Sidebar = () => {
  return (
    <Flex
      alignItems={{ base: "center", md: "baseline" }}
      py={{ base: 3, md: 8 }}
      flexDir="column"
      width="full"
      gap={12}
    >
      <Image h="32px" w="32px" src={constel} alt="Constellation" />

      <Flex display={{ base: "none", md: "flex" }}>
        <Button
          leftIcon={<FontAwesomeIcon icon={faHouse} />}
          colorScheme="blue"
          variant="ghost"
        >
          Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
