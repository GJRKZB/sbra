"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_db_1 = require("./lib/config.db");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const allowedOrigins = [
    "http://localhost:3000",
    "https://spareribs-hoekschewaard.vercel.app",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    console.log("Incoming request from origin:", req.headers.origin);
    next();
});
app.use("/api", userRoutes_1.default);
app.use("/api", restaurantRoutes_1.default);
app.use("/api", reviewRoutes_1.default);
app.use("/api", protectedRoutes_1.default);
(0, config_db_1.ConnectDB)()
    .then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(`[server]: Server failed to start. Error: ${error}`);
});
