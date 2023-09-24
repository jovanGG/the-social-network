import { Flex, Text } from "@chakra-ui/react";

import { PostComment } from "../utils/types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: PostComment[];
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, postId }) => {
  const commentCount = comments.length;

  return (
    <Flex flexDir="column" gap={5}>
      <Text textStyle="h1">
        {commentCount} Comments
      </Text>

      <Flex flexDir="column" gap={4}>
        {comments.map((comment) => (
          <CommentItem key={comment.comment_id} postId={postId} {...comment} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CommentList;
