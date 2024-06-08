"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { loginSchema, IErrors } from "@/app/utils/validation";
import { useRouter } from "next/navigation";
import { login } from "../authService";
import Redirect from "@/app/components/buttons/redirect/redirect";

interface ILoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILoginInput>({
    email: "Robin@gmail.com",
    password: "test",
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parseLoginData = loginSchema.safeParse(loginData);
      if (!parseLoginData.success) {
        setErrors(parseLoginData.error.formErrors.fieldErrors);
        return;
      }
      const result = await login(loginData);
      if (result.success) {
        router.push("/");
      } else {
        if (result.message === "User not found") {
          setErrors({ email: result.message });
        } else if (result.message === "Invalid password") {
          setErrors({ password: result.message });
        }
      }
    } catch (error: any) {
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
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Button color="default" variant="ghost" size="lg" type="submit">
          Login
        </Button>
        <p className="font-mono text-sm">Don't have an account?</p>
        <Redirect url="/auth/register">Register</Redirect>
      </form>
    </div>
  );
};

export default Login;
