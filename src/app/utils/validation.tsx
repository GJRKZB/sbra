import { z } from "zod";

export interface Errors {
  email?: string[];
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
}

const userSchema = z
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

export { userSchema };
