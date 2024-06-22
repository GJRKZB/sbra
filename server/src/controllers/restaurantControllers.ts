import { Request, Response } from "express";
import { Restaurant } from "../models";

export const addRestaurant = async (req: Request, res: Response) => {
  const { restaurantTitle, description, image, slug } = req.body;

  try {
    const newRestaurant = new Restaurant({
      restaurantTitle,
      description,
      image,
      slug,
    });
    await newRestaurant.save();
    return res.status(201).json({ message: "Restaurant added successfully." });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const allRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const singleRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "reviews"
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};
