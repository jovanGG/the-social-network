import {
  InputRightElement,
  FormErrorMessage,
  FormControl,
  IconButton,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import React from "react";

import useSendPostComment from "../hooks/useSendPostComment";
import { SendCommentRequest } from "../utils/types";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { sendComment, isSendingComment } = useSendPostComment(postId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCommentRequest>();

  const handleSendComment = (data: SendCommentRequest) => {
    sendComment(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSendComment)}>
      <FormControl isInvalid={Boolean(errors.text)}>
        <InputGroup>
          <Input
            placeholder="Write a comment"
            {...register("text")}
            variant="flushed"
          />

          <InputRightElement>
            <IconButton
              icon={<FontAwesomeIcon color="gray-3.500" icon={faPaperPlane} />}
              isLoading={isSendingComment}
              aria-label="Submit"
              variant="unstyled"
              type="submit"
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.text && errors.text.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default CommentForm;
