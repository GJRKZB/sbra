"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { loginSchema, IErrors } from "@/app/utils/validation";
import { login, ILoginData } from "@/app/service/authService";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
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
        if (result.message === "Gebruiker bestaat niet") {
          setErrors({ email: result.message });
        } else if (result.message === "Ongeldig wachtwoord") {
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
          label="E-mailadres"
          name="email"
          placeholder="E-mailadres"
          variant="bordered"
          value={loginData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          isRequired
          type="password"
          label="Wachtwoord"
          name="password"
          placeholder="Wachtwoord"
          variant="bordered"
          value={loginData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Button color="default" variant="ghost" size="lg" type="submit">
          Inloggen
        </Button>
        <p className="font-mono text-sm">Nog geen account?</p>
        <Link href="/auth/register" className="font-mono text-sm font-bold">
          Registreren
        </Link>
      </form>
      <Link href="/" className="font-mono text-sm">
        Terug naar homepage
      </Link>
    </div>
  );
};

export default Login;
