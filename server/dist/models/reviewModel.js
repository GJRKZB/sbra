"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewItemSchema = new mongoose_1.default.Schema({
    label: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
});
const reviewSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    reviews: [reviewItemSchema],
    average: { type: Number, default: 0 },
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
