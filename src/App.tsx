import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./features/auth/context/AuthProvider";
import { queryClient } from "./config/axios";
import AppRoutes from "./routes/AppRoutes";
import theme from "./styles/theme";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <AppRoutes />
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
