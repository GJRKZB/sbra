"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/restaurants", index_1.addRestaurant);
router.get("/restaurants", index_1.allRestaurants);
router.get("/restaurants/:slug", index_1.singleRestaurant);
exports.default = router;
