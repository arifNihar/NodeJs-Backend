import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  signOut,
  updateUser,
  google,
  signIn,
  signUp,
} from "../controllers/userController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);

//Users routes
router.put("/update/:userId", verifyUserByToken, updateUser);
router.delete("/:userId", verifyUserByToken, deleteUser);
router.post("/signout", signOut);
router.get("/users", verifyUserByToken, getUsers);
router.get("/:userId", getUser);

export default router;
