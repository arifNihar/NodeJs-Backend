import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  updateUser,
  google,
  signin,
  signup,
} from "../controllers/userController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

//Users routes
router.put("/update/:userId", verifyUserByToken, updateUser);
router.delete("/:userId", verifyUserByToken, deleteUser);
router.post("/signout", signout);
router.get("/users", verifyUserByToken, getUsers);
router.get("/:userId", getUser);

export default router;
