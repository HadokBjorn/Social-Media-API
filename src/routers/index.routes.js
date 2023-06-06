import { Router } from "express";
import usersRouter from "./users.routes.js";
import likesRouter from "./likes.routes.js";
import searchRouter from "./search.routes.js";
import timelineRouter from "./timeline.routes.js";

const routers = Router();

routers.use(usersRouter);
routers.use(likesRouter);
routers.use(searchRouter);
routers.use(timelineRouter);

export default routers;
