import { Request, Response, Router } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const token = jwt.sign(
        { _id: user._id?._id, email: user?.email },
        process.env.SECRET_KEY as string,
        { expiresIn: "2hrs" }
      );

      return res
        .status(200)
        .json({ message: "Login successful", success: true, token: token });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
