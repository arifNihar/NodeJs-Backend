import express from "express";
import { verifyUserByToken } from "../utils/verifyUserByToken.js";
import {
  create,
  deleteComment,
  editComment,
  getPostComments,
  getComments,
  likeComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", verifyUserByToken, create);
router.get("/:postId", getPostComments);
router.put("/like/comment/:commentId", verifyUserByToken, likeComment);
router.put("/edit/comment/:commentId", verifyUserByToken, editComment);
router.delete("/:commentId", verifyUserByToken, deleteComment);
router.get("/comments", verifyUserByToken, getComments);

export default router;
