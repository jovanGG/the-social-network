import { extendTheme } from "@chakra-ui/react";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Alert } from "./components/Alert";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    black: {
      500: "#222222",
    },
    blue: {
      500: "#157EFF",
    },
    "blue-hover": {
      500: "#005BCA",
    },
    red: {
      500: "#FF1515",
    },
    "grey-1": {
      500: "#F9F9F9",
    },
    "grey-2": {
      500: "#D9D9D9",
    },
    "grey-3": {
      500: "#A6A6A6",
    },
    "grey-4": {
      500: "#848484",
    },
    "grey-5": {
      500: "#efefef",
    },
  },
  textStyles: {
    h1: {
      fontSize: "lg",
      color: "black.500",
      fontWeight: "black",
    },
    h2: {
      fontSize: "lg",
      color: "black.500",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "md",
      color: "black.500",
      fontWeight: "bold",
    },
    p1: {
      fontSize: "md",
      color: "black.500",
    },
    p2: {
      fontSize: "md",
      color: "black.500",
      lineHeight: "22px",
    },
    p3: {
      fontSize: "sm",
      color: "grey-3.500",
    },
  },
  fontSizes: {
    md: "15px",
    lg: "19px",
  },
  components: {
    Button,
    Alert,
    Card,
  },
});

export default theme;
