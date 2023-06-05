import { Router } from "express";
import usersRouter from "./users.router.js";
import likesRouter from "./likes.router.js";
import searchRouter from "./search.routes.js";

const routers = Router();

routers.use(usersRouter);
routers.use(likesRouter);
routers.use(searchRouter)

export default routers;
