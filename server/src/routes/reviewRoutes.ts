import { addReview, restaurantReviews } from "../controllers/reviewControllers";
import { Router } from "express";

const router = Router();

router.post("/reviews", addReview);
router.get("/reviews/restaurants/:id", restaurantReviews);

export default router;
