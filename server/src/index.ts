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

const isDevelopment = process.env.NODE_ENV === "development";

const allowedOrigins = isDevelopment
  ? ["https://spareribs-hoekschewaard.vercel.app"]
  : ["http://localhost:3000"];

console.log(allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

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
