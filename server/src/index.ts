import express, { Express, Request, Response, Router } from "express";
import { ConnectDB } from "./config.db";
import cors from "cors";
import dotenv from "dotenv";
import Review from "./models/reviewModel";

dotenv.config();

ConnectDB();

const app: Express = express();
const port = process.env.PORT || 8080;
const router = Router();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

router.post("/api/reviews", async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { title, reviews } = reqBody;

    const updateReview = await Review.findOneAndUpdate(
      { title },
      { reviews },
      { new: true }
    );

    if (updateReview) {
      return res.status(200).json({
        message: "Review has been updated with success",
      });
    } else {
      const review = new Review({ title, reviews });

      await review.save();

      return res.status(201).json({
        message: "Review has been added with success",
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is  http://localhost:${port}`);
});
