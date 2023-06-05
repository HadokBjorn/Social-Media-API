import { Router } from "express";
import usersRouter from "./users.router.js";
import likesRouter from "./likes.router.js";

const routers = Router();

routers.use(usersRouter);
routers.use(likesRouter);

export default routers;
