import express, { Express, Router } from "express";
import { ConnectDB } from "./lib/config.db";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", userRoutes);

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`[server]: Server failed to start. Error: ${error}`);
  });
