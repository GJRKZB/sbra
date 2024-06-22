import { Request, Response } from "express";
import { CustomRequest } from "../types/types";

export const protectedControllers = async (
  req: CustomRequest,
  res: Response
) => {
  res.json({ message: "Access granted", user: req.user });
};
