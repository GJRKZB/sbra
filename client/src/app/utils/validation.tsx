import { z } from "zod";

export interface IErrors {
  email?: string[];
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
  message?: string[];
}

const loginSchema = z.object({
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  password: z.string().min(1, { message: "Ongeldig wachtwoord" }),
});

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Wachtwoord komt niet overeen",
      path: ["confirmPassword"],
    }
  );

export { loginSchema, registerSchema };
