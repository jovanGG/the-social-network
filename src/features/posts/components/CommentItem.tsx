import {
  useBreakpointValue,
  Divider,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";

import useDeletePostComment from "../hooks/useDeletePostComment";
import useAuth from "../../auth/hooks/useAuth";
import { PostComment } from "../utils/types";
import UserBadge from "./UserBadge";
import PostDate from "./PostDate";

interface CommentItemProps extends PostComment {
  postId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment_id,
  created_at,
  full_name,
  username,
  picture,
  postId,
  text,
}) => {
  const { user } = useAuth();
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const { deleteComment, isDeletingComment } = useDeletePostComment(
    postId,
    comment_id
  );

  const handleDeleteComment = () => {
    deleteComment();
  };

  return (
    <Flex flexDir="column" gap={2}>
      <Flex justifyContent="space-between">
        <UserBadge
          full_name={full_name}
          username={username}
          picture={picture}
        />
        <Flex alignItems="center" gap={3}>
          <PostDate createdAt={created_at} />

          {!isMobile && user?.account.username === username && (
            <Button
              isLoading={isDeletingComment}
              onClick={handleDeleteComment}
              leftIcon={<FaRegTrashCan />}
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

      <Text textStyle="p2">{text}</Text>

      {isMobile && (
        <>
          <Divider borderColor="grey-2.500" mb={2} />
          {user?.account.username === username && (
            <Button
              isLoading={isDeletingComment}
              onClick={handleDeleteComment}
              leftIcon={<FaRegTrashCan />}
              fontWeight="normal"
              variant="link"
              color="red"
              size="sm"
            >
              Delete
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};

export default CommentItem;
