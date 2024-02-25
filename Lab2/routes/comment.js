import express from "express";
import {getCommentsByProductId} from "../controllers/comment.js";

const CommentRouter = express.Router();
CommentRouter.get('/:id', getCommentsByProductId)
export default CommentRouter;