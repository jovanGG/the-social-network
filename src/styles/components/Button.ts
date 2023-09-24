import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const medium = defineStyle({
  borderRadius: 10,
  fontSize: "md",
  w: 180,
  h: 50,
});

const small = defineStyle({
  borderRadius: 5,
  fontSize: "md",
  w: {
    base: "100%",
    md: 90,
  },
  h: 34,
});

const brandBlue = defineStyle({
  background: "blue.500",
  color: "white",
  _hover: {
    background: "blue-hover.500",
  },
  _active: {
    background: "blue.500",
    _hover: {
      background: "blue-hover.500",
    },
  },
});

const brandRed = defineStyle({
  background: "red.500",
  color: "white",
  _hover: {
    background: "red.500",
  },
  _active: {
    background: "red.500",
    _hover: {
      background: "red.500",
    },
  },
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
  variants: { brandBlue, brandRed, brandPrimary, brandPrimaryAlt },
  sizes: { small, medium },
});
