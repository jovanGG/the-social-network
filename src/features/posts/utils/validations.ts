import * as Yup from "yup";

export const commentSchema = Yup.object({
  text: Yup.string().required().label("Comment"),
});

export const postSchema = Yup.object({
  text: Yup.string().required().label("Text"),
});
