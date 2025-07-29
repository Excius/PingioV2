import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Extend Express Request interface to include 'user'
import { Document } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user?: Document<any>;
    }
  }
}

export const authorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provider" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded || typeof decoded === "string" || !(decoded as any).userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById((decoded as any).userId).select(
      "-password -__v"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authorized middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
