import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", verifyUserByToken, createComment);
router.get("/:postId", getPostComments);
router.put("/like/comment/:commentId", verifyUserByToken, likeComment);
router.put("/edit/comment/:commentId", verifyUserByToken, editComment);
router.delete("/:commentId", verifyUserByToken, deleteComment);
router.get("/comments", verifyUserByToken, getcomments);

export default router;
