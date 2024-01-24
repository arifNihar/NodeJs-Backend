import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  updateChat,
  deleteChat,
  sendChat,
  getChats,
  getChat,
} from "../controllers/chatController.js";

const router = express.Router();

//Users routes
router.put("/update/:chatId", verifyUserByToken, updateChat);
router.delete("/:chatId", verifyUserByToken, deleteChat);
router.post("/send-chat", verifyUserByToken, sendChat);
router.get("/", verifyUserByToken, getChats);
router.get("/:chatId", getChat);

export default router;
