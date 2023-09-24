import { Flex, Text, Image, Button } from "@chakra-ui/react";
import { FaRegComment, FaHeart } from "react-icons/fa6";

import useFetchPostComments from "../hooks/useFetchPostComments";
import useSendLikeStatus from "../hooks/useSendLikeStatus";
import useFetchPost from "../hooks/useFetchPost";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import UserBadge from "./UserBadge";
import PostDate from "./PostDate";
import Player from "./Player";
import Loader from "./Loader";

interface PostPreviewProps {
  postId: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({ postId }) => {
  const { post, isLoadingPost, isErrorPost } = useFetchPost(postId);
  const { comments, isLoadingComments, isErrorComments } =
    useFetchPostComments(postId);

  const { sendLikeOrUnlike, isLikeStatusSending, isUnlikeStatusSending } =
    useSendLikeStatus(postId);

  const handleLikeChange = (isLiked: boolean) => {
    sendLikeOrUnlike(isLiked);
  };

  return (
    <>
      <Flex gap={5} flexDir="column">
        {isLoadingPost ? (
          <Loader />
        ) : isErrorPost ? (
          <Text textStyle="h1">Error loading post</Text>
        ) : (
          post && (
            <Flex gap={2} flexDir="column">
              <UserBadge {...post.user} />

              {post.image && (
                <Image
                  borderRadius={10}
                  objectFit="cover"
                  width="full"
                  maxH="285px"
                  src={post.image}
                />
              )}
              {post.audio && <Player src={post.audio} />}

              <PostDate createdAt={post.created_at} />

              <Text fontSize="md" color="black.500">
                {post.text}
              </Text>

              <CommentForm postId={post.post_id} />

              <Flex gap={4}>
                <Button
                  isLoading={isLikeStatusSending || isUnlikeStatusSending}
                  leftIcon={<FaHeart />}
                  onClick={() => handleLikeChange(post.liked)}
                  variant="brandPrimaryAlt"
                  isActive={post.liked}
                  size="small"
                >
                  {post.likes}
                </Button>

                <Button
                  leftIcon={<FaRegComment />}
                  variant="brandPrimaryAlt"
                  pointerEvents="none"
                  size="small"
                >
                  {post.comments}
                </Button>
              </Flex>
            </Flex>
          )
        )}

        {isLoadingComments ? (
          <Loader />
        ) : isErrorComments ? (
          <Text textStyle="h1">Error loading comments</Text>
        ) : (
          comments && <CommentList postId={postId} comments={comments} />
        )}
      </Flex>
    </>
  );
};

export default PostPreview;
