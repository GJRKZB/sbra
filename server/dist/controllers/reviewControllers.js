"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantReviews = exports.addReview = void 0;
const models_1 = require("../models");
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, restaurantId, reviews } = req.body;
    try {
        let review = yield models_1.Review.findOne({
            user: userId,
            restaurant: restaurantId,
        });
        if (review) {
            review.reviews = reviews;
            yield review.save();
        }
        else {
            review = new models_1.Review({
                user: userId,
                restaurant: restaurantId,
                reviews: reviews,
            });
        }
        const totalRating = review.reviews.reduce((sum, item) => sum + item.rating, 0);
        review.average = totalRating / review.reviews.length;
        yield review.save();
        yield models_1.User.findByIdAndUpdate(userId, { $addToSet: { reviews: review._id } }, { new: true });
        const allRestaurantReviews = yield models_1.Review.find({
            restaurant: restaurantId,
        });
        const restaurantTotalRating = allRestaurantReviews.reduce((sum, review) => sum + (review.average || 0), 0);
        const restaurantAverageRating = restaurantTotalRating / allRestaurantReviews.length;
        yield models_1.Restaurant.findByIdAndUpdate(restaurantId, { totalAverage: restaurantAverageRating }, { new: true });
        yield models_1.Review.find({
            user: userId,
            restaurant: restaurantId,
        });
        const userAverageRating = review.average;
        return res.status(201).json({
            message: "added review succesfully",
            review: review,
            userAverageRating: userAverageRating,
            restaurantAverageRating: restaurantAverageRating,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.addReview = addReview;
const restaurantReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield models_1.Review.find({
            restaurant: req.params.id,
        }).populate("user", "username");
        return res.status(200).json({ reviews });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.restaurantReviews = restaurantReviews;
