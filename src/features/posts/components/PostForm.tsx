import {
  FormErrorMessage,
  FormControl,
  Button,
  Avatar,
  Input,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { postSchema } from "../utils/validations";
import { SendPostRequest } from "../utils/types";
import useAuth from "../../auth/hooks/useAuth";
import useSendPost from "../hooks/useSendPost";
import AudioRecorder from "./AudioRecorder";

const PostForm = () => {
  const { user } = useAuth();
  const { sendPost, isSendingPost } = useSendPost();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendPostRequest>({
    resolver: yupResolver(postSchema),
  });

  const handleSendPost = (data: SendPostRequest) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    sendPost(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Flex backgroundColor="grey-1.500" borderRadius={10} p={7}>
      <Flex width="full" gap={4}>
        <Avatar
          size="md"
          name={user?.account.full_name}
          src={user?.account.picture}
        />

        <form style={{ width: "100%" }} onSubmit={handleSubmit(handleSendPost)}>
          <FormControl isInvalid={Boolean(errors.text)}>
            <Input
              placeholder="What's happening"
              isReadOnly={isSendingPost}
              {...register("text")}
              variant="flushed"
            />
            <FormErrorMessage>
              {errors.text && errors.text.message}
            </FormErrorMessage>
          </FormControl>

          <Flex pt={4} justifyContent="space-between">
            <AudioRecorder />

            <Button
              isLoading={isSendingPost}
              variant="brandPrimary"
              size="medium"
              type="submit"
            >
              New Post
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default PostForm;
