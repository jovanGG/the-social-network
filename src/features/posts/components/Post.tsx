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

import { Post as PostTypes } from "../utils/types";
import { formatDate } from "../utils/formatDate";

interface PostProps {
  post: PostTypes;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const {
    user: { username, full_name, picture },
    created_at,
    comments,
    image,
    liked,
    audio,
    likes,
    text,
  } = post;

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
            leftIcon={<FontAwesomeIcon icon={faHeart} />}
            variant="brandPrimaryAlt"
            isActive={liked}
            size="sm"
          >
            {likes}
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faComment} />}
            variant="brandPrimaryAlt"
            isActive={liked}
            size="sm"
          >
            {comments}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Post;
