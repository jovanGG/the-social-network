import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Input,
  Image,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useFetchAccessToken from "../hooks/useFetchAccessToken";
import { loginSchema } from "../utils/validations";
import constel from "../../../assets/constel.svg";
import { Routes } from "../../../routes/config";
import useAuth from "../hooks/useAuth";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { fetchToken, isFetchingToken } = useFetchAccessToken();
  const { handleAccessToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: FormData) => {
    fetchToken(data, {
      onSuccess: (res) => {
        handleAccessToken(res.token);
        navigate(Routes.Home.path);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <VStack spacing={5}>
        <Image src={constel} />

        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel fontSize="lg" fontWeight="black">
            Email
          </FormLabel>
          <Input
            _focusVisible={{
              boxShadow: "0",
              borderColor: "blue.500",
            }}
            _invalid={{ boxShadow: "0", borderColor: "red.500" }}
            placeholder="Enter email here..."
            disabled={isFetchingToken}
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel fontSize="lg" fontWeight="black">
            Password
          </FormLabel>
          <Input
            _focusVisible={{
              boxShadow: "0",
              borderColor: "blue.500",
            }}
            _invalid={{ boxShadow: "0", borderColor: "red.500" }}
            placeholder="Enter password here..."
            disabled={isFetchingToken}
            {...register("password")}
            type="password"
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button size="md" type="submit">
          Confirm
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
