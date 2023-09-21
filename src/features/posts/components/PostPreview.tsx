import { Avatar, Flex, Text, Image, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import useFetchPostComments from "../hooks/useFetchPostComments";
import useSendLikeStatus from "../hooks/useSendLikeStatus";
import { formatDate } from "../utils/formatDate";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Post } from "../utils/types";
import Loader from "./Loader";

interface PostPreviewProps {
  post: Post;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const { comments, isCommentsLoading } = useFetchPostComments(post.post_id);

  const { sendLikeOrUnlike, isLikeStatusSending, isUnlikeStatusSending } =
    useSendLikeStatus(post.post_id);

  const handleLikeChange = () => {
    sendLikeOrUnlike(post.liked);
  };

  return (
    <Flex gap={5} flexDir="column">
      <Flex gap={2} flexDir="column">
        <Flex gap={3}>
          <Avatar
            size="md"
            name={post.user.full_name}
            src={post.user.picture}
          />
          <Flex flexDir="column">
            <Text color="grey-3.500" fontSize="sm">
              @{post.user.username}
            </Text>
            <Text fontSize="md" color="black.500" fontWeight="bold">
              {post.user.full_name}
            </Text>
          </Flex>
        </Flex>

        {post.image && (
          <Image
            borderRadius={10}
            objectFit="cover"
            width="full"
            maxH="285px"
            src={post.image}
          />
        )}
        {post.audio && <Text>Has audio</Text>}

        <Flex alignItems="center" gap={1}>
          <FontAwesomeIcon color="#A6A6A6" icon={faCalendar} size="sm" />
          <Text textColor="grey-3.500" fontSize="sm">
            {formatDate(post.created_at)}
          </Text>
        </Flex>

        <Text fontSize="md" color="black.500">
          {post.text}
        </Text>

        <CommentForm postId={post.post_id} />

        <Flex gap={4}>
          <Button
            isLoading={isLikeStatusSending || isUnlikeStatusSending}
            leftIcon={<FontAwesomeIcon icon={faHeart} />}
            onClick={handleLikeChange}
            variant="brandPrimaryAlt"
            isActive={post.liked}
            size="sm"
          >
            {post.likes}
          </Button>
        </Flex>
      </Flex>

      {isCommentsLoading ? (
        <Loader />
      ) : (
        comments && <CommentList comments={comments} />
      )}
    </Flex>
  );
};

export default PostPreview;
