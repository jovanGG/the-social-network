import {
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Image,
  Card,
  Text,
  Flex,
} from "@chakra-ui/react";
import { faComment, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import useSendLikeStatus from "../hooks/useSendLikeStatus";
import { formatDate } from "../utils/formatDate";
import PostPreview from "./PostPreview";
import ModalDrawer from "./ModalDrawer";
import { Post } from "../utils/types";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const {
    user: { username, full_name, picture },
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
          <Flex alignItems="center" gap={1}>
            <FontAwesomeIcon color="#A6A6A6" icon={faCalendar} size="sm" />
            <Text textColor="grey-3.500" fontSize="sm">
              {formatDate(created_at)}
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {image && (
          <Image
            borderRadius={10}
            objectFit="cover"
            width="full"
            maxH="285px"
            src={image}
          />
        )}
        {audio && <Text>Has audio</Text>}
        <Text color="black.500">{text}</Text>

        <Flex gap={4}>
          <Button
            isLoading={isLikeStatusSending || isUnlikeStatusSending}
            leftIcon={<FontAwesomeIcon icon={faHeart} />}
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
                leftIcon={<FontAwesomeIcon icon={faComment} />}
                variant="brandPrimaryAlt"
                onClick={onOpen}
                size="small"
              >
                {comments}
              </Button>
            )}
            children={<PostPreview post={post} />}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PostItem;
