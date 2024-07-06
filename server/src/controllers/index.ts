import { userRegister, userLogin, allReviewsUser } from "./userControllers";
import {
  addRestaurant,
  allRestaurants,
  singleRestaurant,
} from "./restaurantControllers";
import { addReview, restaurantReviews } from "./reviewControllers";
import { protectedControllers } from "./protectedControllers";

export {
  userLogin,
  userRegister,
  allReviewsUser,
  addRestaurant,
  allRestaurants,
  singleRestaurant,
  addReview,
  restaurantReviews,
  protectedControllers,
};
