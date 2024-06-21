import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";

export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log(savedUser);

    return res
      .status(201)
      .json({ message: "User created successfully", success: true, savedUser });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "An error occurred.",
      });
  }
};
