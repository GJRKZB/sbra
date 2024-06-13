import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CustomRequest } from "../types/types";
import { Restaurant, User } from "../models";

const router = Router();

router.post(
  "/api/restaurant",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { title, description, image, slug, reviews } = req.body;
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res
          .status(400)
          .json({ message: "You're not authenticated to add a restaurant." });
      }

      const existingRestaurant = await Restaurant.findOne({ title });
      if (existingRestaurant) {
        existingRestaurant.title = title;
        existingRestaurant.description = description;
        existingRestaurant.image = image;
        existingRestaurant.slug = slug;
        existingRestaurant.reviews = reviews;
        await existingRestaurant.save();

        return res
          .status(201)
          .json({ message: "Restaurant updated successfully." });
      }

      const newRestaurant = new Restaurant({
        title,
        description,
        image,
        slug,
        reviews,
      });

      await newRestaurant.save();

      return res
        .status(201)
        .json({ message: "Restaurant added successfully." });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "An error occurred.",
      });
    }
  }
);

export default router;
