"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/register", index_1.userRegister);
router.post("/login", index_1.userLogin);
router.get("/users/:slug/reviews", authMiddleware_1.default, index_1.allReviewsUser);
exports.default = router;
