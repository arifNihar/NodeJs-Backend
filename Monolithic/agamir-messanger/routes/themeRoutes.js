import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  deleteTheme,
  getTheme,
  getThemes,
  createTheme,
  updateTheme,
} from "../controllers/themeController.js";

const router = express.Router();

//Users routes
router.put("/update/:themeId", verifyUserByToken, updateTheme);
router.delete("/:themeId", verifyUserByToken, deleteTheme);
router.post("/create", createTheme);
router.get("/", verifyUserByToken, getThemes);
router.get("/:themeId", getTheme);

export default router;
