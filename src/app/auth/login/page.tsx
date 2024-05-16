"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { loginSchema, Errors } from "@/app/utils/validation";

interface LoginInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [login, setLogin] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(login);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    } else {
      console.log(login);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        className="flex flex-col justify-center gap-4 w-72"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          isRequired
          type="text"
          label="Username"
          name="username"
          placeholder="Username"
          variant="bordered"
          value={login.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
          errorMessage={errors.username}
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
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
