import { Text, Flex, Avatar } from "@chakra-ui/react";

import { User } from "../utils/types";

interface UserBadgeprops extends User {}

const UserBadge: React.FC<UserBadgeprops> = ({
  full_name,
  username,
  picture,
}) => {
  return (
    <Flex gap={3}>
      <Avatar size="md" name={full_name} src={picture} />
      <Flex flexDir="column">
        <Text textStyle="p3">@{username}</Text>
        <Text textStyle="h3">
          {full_name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserBadge;
