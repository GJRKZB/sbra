"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewControllers_1 = require("../controllers/reviewControllers");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/reviews", reviewControllers_1.addReview);
router.get("/reviews/restaurants/:id", reviewControllers_1.restaurantReviews);
exports.default = router;
