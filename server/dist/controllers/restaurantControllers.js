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
exports.singleRestaurant = exports.allRestaurants = exports.addRestaurant = void 0;
const models_1 = require("../models");
const addRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantTitle, location, description, image, slug, reviews } = req.body;
    try {
        const newRestaurant = new models_1.Restaurant({
            restaurantTitle,
            location,
            description,
            image,
            slug,
            reviews: reviews || [
                { label: "Hoe ziet het eruit?", rating: 0 },
                { label: "Hoe makkelijk van het bot?", rating: 0 },
                { label: "Smaak", rating: 0 },
                { label: "Smaak Marinade", rating: 0 },
                { label: "Happy hands", rating: 0 },
                { label: "Sfeer omgeving", rating: 0 },
                { label: "Hoe schoon toilet?", rating: 0 },
                { label: "Snelheid personeel", rating: 0 },
            ],
        });
        yield newRestaurant.save();
        return res.status(201).json({ message: "Restaurant added successfully." });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.addRestaurant = addRestaurant;
const allRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield models_1.Restaurant.find().sort({ totalAverage: -1 });
        return res.status(200).json({ restaurants });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.allRestaurants = allRestaurants;
const singleRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const restaurant = yield models_1.Restaurant.find({ slug });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }
        res.json({ restaurant });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred.",
        });
    }
});
exports.singleRestaurant = singleRestaurant;
