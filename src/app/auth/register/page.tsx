"use client";

import { useState } from "react";
import { userSchema, Errors } from "@/app/utils/validation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

interface RegisterInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [register, setRegister] = useState<RegisterInput>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = userSchema.safeParse(register);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    } else {
      console.log(register);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-4">
      <h1 className="text-3xl font-bold">Register</h1>
      <form
        className="flex flex-col justify-center gap-4 w-72"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          isRequired
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          variant="bordered"
          value={register.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          isRequired
          type="text"
          label="Username"
          name="username"
          placeholder="Username"
          variant="bordered"
          value={register.username}
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
          value={register.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          variant="bordered"
          value={register.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
        <Button color="primary" variant="ghost" size="lg" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
