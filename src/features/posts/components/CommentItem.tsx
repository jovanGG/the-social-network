import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Flex, Avatar, Text, Button } from "@chakra-ui/react";

import { formatDate } from "../utils/formatDate";
import useAuth from "../../auth/hooks/useAuth";
import { PostComment } from "../utils/types";

const CommentItem: React.FC<PostComment> = ({
  created_at,
  full_name,
  username,
  picture,
  text,
}) => {
  const { user } = useAuth();

  return (
    <Flex flexDir="column" gap={2}>
      <Flex justifyContent="space-between">
        <Flex gap={3}>
          <Avatar size="md" name={full_name} src={picture} />
          <Flex flexDir="column">
            <Text color="grey-3.500" fontSize="sm">
              @{username}
            </Text>
            <Text fontSize="md" color="black.500" fontWeight="bold">
              {full_name}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap={3}>
          <FontAwesomeIcon color="#A6A6A6" icon={faCalendar} size="sm" />
          <Text textColor="grey-3.500" fontSize="sm">
            {formatDate(created_at)}
          </Text>

          {user?.account.username === username && (
            <Button
              leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
              fontWeight="normal"
              variant="link"
              color="red"
              size="sm"
            >
              Delete
            </Button>
          )}
        </Flex>
      </Flex>

      <Flex>
        <Text color="black.500">{text}</Text>
      </Flex>
    </Flex>
  );
};

export default CommentItem;
