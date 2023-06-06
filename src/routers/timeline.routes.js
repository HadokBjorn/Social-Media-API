import { Router } from "express";
import postSchema from "../schemas/post.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { getAllPosts } from "../controllers/timeline.controller.js";
import { createPost } from "../controllers/timeline.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", getAllPosts);
timelineRouter.post("/timeline", validateSchema(postSchema), authorization, createPost);

export default timelineRouter;