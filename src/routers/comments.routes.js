import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { commentSchema } from "../schemas/comments.schema.js";
import { authorization } from "../middlewares/auth.middleware.js";
import { createComment, getComments } from "../controllers/comments.controller.js";

const commentsRouter = Router();

commentsRouter.post(
	"/posts/:id/comments",
	authorization,
	validateSchema(commentSchema),
	createComment
);
commentsRouter.get("/posts/:id/comments", authorization, getComments);

export default commentsRouter;
