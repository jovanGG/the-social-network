import {
  CardHeader,
  CardBody,
  Button,
  Image,
  Card,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaHeart, FaRegComment } from "react-icons/fa";

import useSendLikeStatus from "../hooks/useSendLikeStatus";
import PostPreview from "./PostPreview";
import ModalDrawer from "./ModalDrawer";
import { Post } from "../utils/types";
import UserBadge from "./UserBadge";
import PostDate from "./PostDate";
import Player from "./Player";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const {
    user,
    created_at,
    comments,
    post_id,
    image,
    liked,
    audio,
    likes,
    text,
  } = post;

  const { sendLikeOrUnlike, isLikeStatusSending, isUnlikeStatusSending } =
    useSendLikeStatus(post_id);

  const handleLikeChange = () => {
    sendLikeOrUnlike(liked);
  };

  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <UserBadge {...user} />
          <PostDate createdAt={created_at} />
        </Flex>
      </CardHeader>
      <CardBody>
        {image && (
          <Image
            borderRadius={10}
            objectFit="cover"
            maxH="285px"
            width="full"
            src={image}
          />
        )}

        {audio && <Player src={audio} />}

        <Text textStyle="p2">{text}</Text>

        <Flex gap={4}>
          <Button
            isLoading={isLikeStatusSending || isUnlikeStatusSending}
            leftIcon={<FaHeart />}
            onClick={handleLikeChange}
            variant="brandPrimaryAlt"
            isActive={liked}
            size="small"
          >
            {likes}
          </Button>
          <ModalDrawer
            renderButton={({ onOpen }) => (
              <Button
                leftIcon={<FaRegComment />}
                variant="brandPrimaryAlt"
                onClick={onOpen}
                size="small"
              >
                {comments}
              </Button>
            )}
            children={<PostPreview postId={post.post_id} />}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PostItem;
