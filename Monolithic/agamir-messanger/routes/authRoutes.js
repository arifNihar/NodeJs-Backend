import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import { google, signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);

export default router;
