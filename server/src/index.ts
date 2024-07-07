import express, { Express } from "express";
import { ConnectDB } from "./lib/config.db";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import protectedRoutes from "./routes/protectedRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:3000",
  "https://spareribs-hoekschewaard.vercel.app",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Incoming request from origin:", req.headers.origin);
  next();
});

app.use("/api", userRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", reviewRoutes);
app.use("/api", protectedRoutes);

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`[server]: Server failed to start. Error: ${error}`);
  });
