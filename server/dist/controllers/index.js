"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedControllers = exports.restaurantReviews = exports.addReview = exports.singleRestaurant = exports.allRestaurants = exports.addRestaurant = exports.allReviewsUser = exports.userRegister = exports.userLogin = void 0;
const userControllers_1 = require("./userControllers");
Object.defineProperty(exports, "userRegister", { enumerable: true, get: function () { return userControllers_1.userRegister; } });
Object.defineProperty(exports, "userLogin", { enumerable: true, get: function () { return userControllers_1.userLogin; } });
Object.defineProperty(exports, "allReviewsUser", { enumerable: true, get: function () { return userControllers_1.allReviewsUser; } });
const restaurantControllers_1 = require("./restaurantControllers");
Object.defineProperty(exports, "addRestaurant", { enumerable: true, get: function () { return restaurantControllers_1.addRestaurant; } });
Object.defineProperty(exports, "allRestaurants", { enumerable: true, get: function () { return restaurantControllers_1.allRestaurants; } });
Object.defineProperty(exports, "singleRestaurant", { enumerable: true, get: function () { return restaurantControllers_1.singleRestaurant; } });
const reviewControllers_1 = require("./reviewControllers");
Object.defineProperty(exports, "addReview", { enumerable: true, get: function () { return reviewControllers_1.addReview; } });
Object.defineProperty(exports, "restaurantReviews", { enumerable: true, get: function () { return reviewControllers_1.restaurantReviews; } });
const protectedControllers_1 = require("./protectedControllers");
Object.defineProperty(exports, "protectedControllers", { enumerable: true, get: function () { return protectedControllers_1.protectedControllers; } });