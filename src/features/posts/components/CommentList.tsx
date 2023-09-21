import { Flex, Text } from "@chakra-ui/react";

import { PostComment } from "../utils/types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: PostComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const commentCount = comments.length;

  return (
    <Flex flexDir="column" gap={5}>
      <Text textColor="black.500" fontSize="lg" fontWeight="black">
        {commentCount} Comments
      </Text>

      <Flex flexDir="column" gap={4}>
        {comments.map((comment) => (
          <CommentItem key={comment.comment_id} {...comment} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CommentList;
