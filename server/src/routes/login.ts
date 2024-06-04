import { Request, Response, Router } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

const router = Router();

router.post("/api/login", async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (user && validPassword) {
      return res
        .status(200)
        .json({ message: "Login successful", success: true });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
