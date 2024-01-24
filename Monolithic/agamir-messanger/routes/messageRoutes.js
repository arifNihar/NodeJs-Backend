import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

//Users routes
router.post("/send-message", verifyUserByToken, sendMessage);

export default router;
