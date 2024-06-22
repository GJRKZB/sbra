import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (user && validPassword) {
      const token = jwt.sign(
        { _id: user?._id, email: user?.email },
        process.env.SECRET_KEY as string,
        { expiresIn: "2hrs" }
      );

      return res
        .status(200)
        .json({ message: "Login successful", success: true, token: token });
    }
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", success: true, newUser });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const allReviewsUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "restaurant", select: "restaurantTitle" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user.reviews);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};
