"use client";

import { useState } from "react";
import { registerSchema, IErrors } from "@/app/utils/validation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Redirect from "@/app/components/buttons/redirect/redirect";

interface IRegisterInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [register, setRegister] = useState<IRegisterInput>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parseRegister = registerSchema.safeParse(register);
      if (!parseRegister.success) {
        setErrors(parseRegister.error.formErrors.fieldErrors);
        return;
      } else {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`,
          register
        );
        if (result) {
          router.push("/auth/login");
          console.log(register);
        }
      }
    } catch (error: any) {
      const serverError = error.response.data.error;
      if (serverError === "Email already exists") {
        setErrors({ email: serverError });
      }
      console.error("An error occurred while registering: ", error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-4">
      <h1 className="font-mono text-2xl font-bold">Register</h1>
      <form
        className="flex flex-col justify-center gap-4 w-72 font-mono"
        onSubmit={handleRegister}
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
        <Button color="default" variant="ghost" size="lg" type="submit">
          Register
        </Button>
        <p className="font-mono text-sm">Already have an account?</p>
        <Redirect url="/auth/login">Login</Redirect>
      </form>
    </div>
  );
};

export default Register;
