import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", verifyUserByToken, create);
router.get("/posts", getPosts);
router.delete("/:postId", verifyUserByToken, deletePost);
router.put("/update/post/:postId", verifyUserByToken, updatePost);
router.put("/like/post/:postId", verifyUserByToken, likePost);

export default router;
