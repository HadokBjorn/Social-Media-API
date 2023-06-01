import { Router } from "express";
import { signup } from "../controllers/users.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signupSchema } from "../schemas/users.schema.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signupSchema), signup);

export default usersRouter;
