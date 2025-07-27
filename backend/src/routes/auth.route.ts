import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { authorized } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", authorized, updateUserProfile);

router.get("/check", authorized, checkAuth);

export default router;
