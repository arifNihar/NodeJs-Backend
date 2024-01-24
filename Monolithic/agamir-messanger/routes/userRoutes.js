import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  activeUser,
  getUser,
  getUsers,
  signOut,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//Users routes
router.put("/update/:userId", verifyUserByToken, updateUser);
router.put("/activation/:userId", verifyUserByToken, activeUser);
router.post("/signout", signOut);
router.get("/users", verifyUserByToken, getUsers);
router.get("/:userId", getUser);

export default router;
