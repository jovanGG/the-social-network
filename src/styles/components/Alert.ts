import { AlertProps, createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { alertAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status } = props;

  const errorBase = status === "error" && {
    container: {
      justifyContent: "center",
      background: "red",
      borderRadius: 10,
      color: "white",
      p: 2,
    },
  };

  return {
    ...errorBase,
  };
});

export const Alert = defineMultiStyleConfig({ baseStyle });
