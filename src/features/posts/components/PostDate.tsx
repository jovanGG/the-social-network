import { Text, Flex, Icon } from "@chakra-ui/react";
import { FaRegCalendar } from "react-icons/fa";

import { formatDate } from "../utils/formatDate";

interface PostDateProps {
  createdAt: string;
}

const PostDate: React.FC<PostDateProps> = ({ createdAt }) => {
  return (
    <Flex alignItems="center" gap={1}>
      <Icon fontSize="sm" as={FaRegCalendar} fill="grey-3.500" />
      <Text textStyle="p3">{formatDate(createdAt)}</Text>
    </Flex>
  );
};

export default PostDate;
