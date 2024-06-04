"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { loginSchema, IErrors } from "@/app/utils/validation";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ILoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [login, setLogin] = useState<ILoginInput>({
    email: "Test@gmail.com",
    password: "test1234",
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parseLogin = loginSchema.safeParse(login);
      if (!parseLogin.success) {
        setErrors(parseLogin.error.formErrors.fieldErrors);
        return;
      }
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
        login
      );
      if (result) {
        router.push("/");
      }
    } catch (error: any) {
      const serverError = error.response.data.error;
      if (serverError === "User not found") {
        setErrors({ email: serverError });
      } else if (serverError === "Invalid password") {
        setErrors({ password: serverError });
      }
      console.error("An error occurred while logging in: ", error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-4">
      <h1 className="font-mono text-2xl font-bold">Login</h1>
      <form
        className="flex flex-col justify-center gap-4 w-72 font-mono"
        onSubmit={handleLogin}
        noValidate
      >
        <Input
          isRequired
          type="text"
          label="Email"
          name="email"
          placeholder="Email"
          variant="bordered"
          value={login.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          isRequired
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          variant="bordered"
          value={login.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Button color="primary" variant="ghost" size="lg" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
