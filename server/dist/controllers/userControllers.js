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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allReviewsUser = exports.userRegister = exports.userLogin = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Gebruiker bestaat niet" });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Ongeldig wachtwoord" });
        }
        if (user && validPassword) {
            const token = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email }, process.env.SECRET_KEY, { expiresIn: "2hrs" });
            return res
                .status(200)
                .json({ message: "Login successful", success: true, token: token });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.userLogin = userLogin;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield models_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "E-mailadres bestaat al" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new models_1.User({ username, email, password: hashedPassword });
        yield newUser.save();
        return res
            .status(201)
            .json({ message: "User created successfully", success: true, newUser });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.userRegister = userRegister;
const allReviewsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    try {
        const restaurant = yield models_1.Restaurant.findOne({ slug });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        let review = yield models_1.Review.findOne({
            user: userId,
            restaurant: restaurant._id,
        }).populate("restaurant", "restaurantTitle slug");
        if (!review) {
            return res.json({
                _id: new mongoose_1.default.Types.ObjectId(),
                user: userId,
                restaurant: {
                    _id: restaurant._id,
                    restaurantTitle: restaurant.restaurantTitle,
                    slug: restaurant.slug,
                },
                reviews: restaurant.reviews,
                average: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                __v: 0,
            });
        }
        return res.json(review);
    }
    catch (error) {
        console.error("Error fetching user reviews:", error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.allReviewsUser = allReviewsUser;
