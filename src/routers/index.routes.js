import { Router } from "express";
import usersRouter from "./users.routes.js";
import likesRouter from "./likes.routes.js";
import searchRouter from "./search.routes.js";

const routers = Router();

routers.use(usersRouter);
routers.use(likesRouter);
routers.use(searchRouter);

export default routers;
