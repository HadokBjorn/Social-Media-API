import { Router } from "express";
import usersRouter from "./users.router.js";

const routers = Router();

routers.use(usersRouter);

export default routers;
