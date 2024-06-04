import express, { Express, Request, Response, Router } from "express";
import { ConnectDB } from "./config.db";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviews";

dotenv.config();

ConnectDB();

const app: Express = express();
const port = process.env.PORT || 8080;
const router = Router();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

app.use(reviewRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
