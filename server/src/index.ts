import express, { Express, Router } from "express";
import { ConnectDB } from "./lib/config.db";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviews";
import registerRoutes from "./routes/register";
import loginRoutes from "./routes/login";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const router = Router();

ConnectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

app.use(reviewRoutes);
app.use(registerRoutes);
app.use(loginRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
