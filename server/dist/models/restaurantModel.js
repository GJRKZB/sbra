"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const defaultReviewSchema = new mongoose_1.default.Schema({
    label: { type: String, required: true },
    rating: { type: Number, default: 0 },
});
const restaurantSchema = new mongoose_1.default.Schema({
    restaurantTitle: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    totalAverage: { type: Number, default: 0 },
    reviews: [defaultReviewSchema],
}, {
    timestamps: true,
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
