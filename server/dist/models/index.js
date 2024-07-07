"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Restaurant = exports.User = void 0;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const restaurantModel_1 = __importDefault(require("./restaurantModel"));
exports.Restaurant = restaurantModel_1.default;
const reviewModel_1 = __importDefault(require("./reviewModel"));
exports.Review = reviewModel_1.default;
