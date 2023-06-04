import { Router } from "express";
import { authorization } from "../middlewares/auth.middleware.js";
import { like } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.post("/posts/:id/like", authorization, like);
likesRouter.get("/posts/:id/likes");

export default likesRouter;