import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const md = defineStyle({
  borderRadius: 10,
  fontSize: "md",
  w: 180,
  h: 50,
});

const sm = defineStyle({
  borderRadius: 5,
  fontSize: "md",
  w: 90,
  h: 34,
});

const brandPrimary = defineStyle({
  background: "grey-3.500",
  color: "white",
  _hover: {
    background: "grey-4.500",
  },
  _active: {
    background: "blue.500",
    _hover: {
      background: "blue-hover.500",
    },
  },
});

const brandPrimaryAlt = defineStyle({
  background: "grey-2.500",
  color: "grey-3.500",
  _hover: {
    color: "white",
    background: "grey-3.500",
  },
  _active: {
    color: "white",
    background: "blue.500",
    _hover: {
      background: "blue-hover.500",
    },
  },
});

export const Button = defineStyleConfig({
  variants: { brandPrimary, brandPrimaryAlt },
  sizes: { sm, md },
});
