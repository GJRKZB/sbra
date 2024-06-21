import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CustomRequest } from "../types/types";
import { Restaurant, User, Review } from "../models";

const router = Router();

router.post(
  "/api/restaurant",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { restaurantTitle, description, image, slug } = req.body;
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res
          .status(400)
          .json({ message: "You're not authenticated to add a restaurant." });
      }

      const existingRestaurant = await Restaurant.findOne({ restaurantTitle });

      if (existingRestaurant) {
        existingRestaurant.restaurantTitle = restaurantTitle;
        existingRestaurant.description = description;
        existingRestaurant.image = image;
        existingRestaurant.slug = slug;
        await existingRestaurant.save();
        return res
          .status(201)
          .json({ message: "Restaurant updated successfully." });
      }

      const newRestaurant = new Restaurant({
        restaurantTitle,
        description,
        image,
        slug,
      });
      await newRestaurant.save();
      return res
        .status(201)
        .json({ message: "Restaurant added successfully." });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get("/api/restaurant", async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
});

router.get("/api/restaurant/:slug", async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ slug: req.params.slug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
});

export default router;
