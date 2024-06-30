import { Request, Response } from "express";
import { Restaurant, Review, User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/types";

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

export const allReviewsUser = async (req: CustomRequest, res: Response) => {
  const { slug } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const restaurant = await Restaurant.findOne({ slug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const reviews = await Review.find({
      user: userId,
      restaurant: restaurant._id,
    }).populate("restaurant", "restaurantTitle slug");

    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};
