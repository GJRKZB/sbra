import {
  addRestaurant,
  allRestaurants,
  singleRestaurant,
} from "../controllers/index";
import { Router } from "express";

const router = Router();

router.post("/restaurants", addRestaurant);
router.get("/restaurants", allRestaurants);
router.get("/restaurants/:slug", singleRestaurant);

export default router;
