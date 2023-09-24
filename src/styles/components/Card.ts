import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: {
      base: "transparent",
      md: "grey-1.500",
    },
    borderRadius: "10px",
    boxShadow: 0,
  },
  header: {
    paddingBottom: 0,
    paddingX: {
      base: 0,
      md: 8,
    },
  },
  body: {
    flexDir: "column",
    display: "flex",
    fontSize: "md",
    paddingTop: 3,
    paddingX: {
      base: 0,
      md: 8,
    },
    gap: 3,
  },
});

export const Card = defineMultiStyleConfig({ baseStyle });
