import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Input,
  Image,
  Flex,
  Alert,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useFetchAccessToken from "../hooks/useFetchAccessToken";
import { loginSchema } from "../utils/validations";
import { Routes } from "../../../routes/config";
import useAuth from "../hooks/useAuth";
import constel from "/constel.svg";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { error, fetchToken, isFetchingToken } = useFetchAccessToken();
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
    <form style={{ width: "100%" }} onSubmit={handleSubmit(handleLogin)}>
      <Flex flexDir="column" alignItems="center" gap={5}>
        <Image maxW="80px" alt="Constellation" src={constel} />

        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel textStyle="h1">Email</FormLabel>
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
          <FormLabel textStyle="h1">Password</FormLabel>
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

        {(error as any) && (
          <Alert status="error">
            {error.response.data.error.message as string}
          </Alert>
        )}

        <Button variant="brandPrimary" size="medium" type="submit">
          Confirm
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;
