import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container display="flex" alignItems="center" minH="100vh">
      {children}
    </Container>
  );
};

export default Layout;
