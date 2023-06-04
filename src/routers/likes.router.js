import { Router } from "express";
import { authorization } from "../middlewares/auth.middleware.js";

const likesRouter = Router();

usersRouter.post("/posts/:id/like", authorization);
usersRouter.get("/posts/:id/likes");

export default likesRouter;