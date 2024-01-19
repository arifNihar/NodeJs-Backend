import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

import {
  followUnfollowUser,
  freezeAccount,
  getUserProfile,
  getSuggestedUsers,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

export default router;
