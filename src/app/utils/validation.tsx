import { z } from "zod";

export interface Errors {
  email?: string[];
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
}

const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
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
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export { loginSchema, registerSchema };
