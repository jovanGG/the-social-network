import {
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Card,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

import { Post as PostTypes } from "../utils/types";

interface PostProps {
  post: PostTypes;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const {
    user: { username, full_name, picture },
    created_at,
    comments,
    image,
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
              <Text color="black.500" fontWeight="bold">
                {full_name}
              </Text>
            </Flex>
          </Flex>
          <Flex>{created_at}</Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {image && <Image borderRadius={10} src={image} />}
        {audio && <Text>Has audio</Text>}
        <Text color="black.500">{text}</Text>

        <Button>{likes}</Button>
        <Button>{comments}</Button>
      </CardBody>
    </Card>
  );
};

export default Post;
