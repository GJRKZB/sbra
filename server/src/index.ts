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

export const getCorsDomain = () => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://spareribs-hoekschewaard.vercel.app",
  ];
  return allowedOrigins;
};

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    const allowedOrigins = getCorsDomain();
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
