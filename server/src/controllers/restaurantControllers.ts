import { Request, Response } from "express";
import { Restaurant } from "../models";

export const addRestaurant = async (req: Request, res: Response) => {
  const { restaurantTitle, location, description, image, slug, reviews } =
    req.body;

  try {
    const newRestaurant = new Restaurant({
      restaurantTitle,
      location,
      description,
      image,
      slug,
      reviews: reviews || [
        { label: "Hoe ziet het eruit?", rating: 0 },
        { label: "Hoe makkelijk van het bot?", rating: 0 },
        { label: "Smaak", rating: 0 },
        { label: "Smaak Marinade", rating: 0 },
        { label: "Happy hands", rating: 0 },
        { label: "Sfeer omgeving", rating: 0 },
        { label: "Hoe schoon toilet?", rating: 0 },
        { label: "Snelheid personeel", rating: 0 },
      ],
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
    const restaurants = await Restaurant.find().sort({ totalAverage: -1 });
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const singleRestaurant = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const restaurant = await Restaurant.find({ slug });
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
