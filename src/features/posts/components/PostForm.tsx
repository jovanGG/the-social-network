import {
  useBreakpointValue,
  FormErrorMessage,
  useDisclosure,
  FormControl,
  IconButton,
  Button,
  Avatar,
  Input,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaMicrophone, FaTrashCan } from "react-icons/fa6";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postSchema } from "../utils/validations";
import { SendPostRequest } from "../utils/types";
import useAuth from "../../auth/hooks/useAuth";
import useSendPost from "../hooks/useSendPost";
import Recorder from "./Recorder";

const PostForm = () => {
  const { user } = useAuth();
  const { sendPost, isSendingPost } = useSendPost();
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const methods = useForm<SendPostRequest>({
    resolver: yupResolver(postSchema),
  });

  const handleSendPost = (data: SendPostRequest) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    sendPost(formData, {
      onSuccess: () => methods.reset(),
    });
  };

  const handleCancelRecording = () => {
    methods.setValue("audio", undefined);
    onToggle();
  };

  return (
    <FormProvider {...methods}>
      <Flex
        backgroundColor={{ base: "transparent", md: "grey-1.500" }}
        p={{ base: 0, md: 7 }}
        borderRadius={10}
      >
        <Flex width="full" gap={4}>
          <form
            style={{ width: "100%" }}
            onSubmit={methods.handleSubmit(handleSendPost)}
          >
            <Flex gap={4}>
              <Avatar
                size="md"
                name={user?.account.full_name}
                src={user?.account.picture}
              />
              <FormControl isInvalid={Boolean(methods.formState.errors.text)}>
                <Input
                  placeholder="What's happening"
                  isReadOnly={isSendingPost}
                  {...methods.register("text")}
                  variant="flushed"
                />
                <FormErrorMessage>
                  {methods.formState.errors.text &&
                    methods.formState.errors.text.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {isOpen && <Recorder />}

            <Flex
              justifyContent={isOpen ? "flex-end" : "space-between"}
              flexDir={{ base: "column", md: "row" }}
              alignItems="center"
              gap={2}
              pt={4}
            >
              {isMobile ? (
                <Button
                  leftIcon={<Icon as={FaMicrophone} />}
                  variant="brandBlue"
                  onClick={onToggle}
                  hidden={isOpen}
                  width="full"
                >
                  Record audio
                </Button>
              ) : (
                <IconButton
                  icon={<Icon as={FaMicrophone} />}
                  aria-label="Toggle record"
                  onClick={onToggle}
                  color="blue.500"
                  hidden={isOpen}
                  variant="ghost"
                  rounded="full"
                  fontSize="xl"
                  size="md"
                />
              )}

              <Flex
                flexDir={{ base: "column", md: "row" }}
                justifyContent="flex-end"
                alignItems="stretch"
                width="full"
                gap={4}
              >
                {isOpen ? (
                  isMobile ? (
                    <Button
                      onClick={handleCancelRecording}
                      fontWeight="400"
                      variant="unstyled"
                      color="red.500"
                    >
                      Delete recording
                    </Button>
                  ) : (
                    <IconButton
                      icon={<Icon color="red.500" as={FaTrashCan} />}
                      onClick={handleCancelRecording}
                      aria-label="Cancel recording"
                      variant="ghost"
                      size="lg"
                    />
                  )
                ) : null}

                <Button
                  width={{ base: "full", md: 180 }}
                  isLoading={isSendingPost}
                  variant="brandPrimary"
                  size="medium"
                  type="submit"
                >
                  New Post
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default PostForm;
