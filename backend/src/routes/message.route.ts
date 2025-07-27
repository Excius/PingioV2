import express from "express";
import { authorized } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", authorized, getUsersForSidebar);
router.get("/:id", authorized, getMessages);

router.post("/send/:id", authorized, sendMessage);

export default router;
