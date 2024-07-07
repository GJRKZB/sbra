"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const protectedControllers_1 = require("../controllers/protectedControllers");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/protected", authMiddleware_1.default, protectedControllers_1.protectedControllers);
exports.default = router;
