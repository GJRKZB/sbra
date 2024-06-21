import { userRegister } from "../controllers/userRegister";
import { userLogin } from "../controllers/userLogin";
import { Router } from "express";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
