import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <Container
      gridTemplateColumns={{ base: "1fr", md: "200px minmax(500px, 795px)" }}
      gridTemplateRows={{ base: "auto 1fr" }}
      maxW="container.lg"
      display="grid"
      p={0}
    >
      <Sidebar />

      <Box
        borderRightStyle="solid"
        borderColor="grey-2.500"
        borderLeftStyle="solid"
        borderRightWidth={1}
        borderLeftWidth={1}
      >
        <Header />

        <Container maxW="container.md">
          <Outlet />
        </Container>
      </Box>
    </Container>
  );
};

export default Layout;
