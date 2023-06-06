import { Router } from "express";
import { deletePost, login, signup, updatePost } from "../controllers/users.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { loginSchema, signupSchema } from "../schemas/users.schema.js";
import { validateLogin } from "../middlewares/users.middleware.js";
import { authorization } from "../middlewares/auth.middleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signupSchema), signup);
usersRouter.post("/login", validateSchema(loginSchema), validateLogin, login);
usersRouter.put("/posts/:id", authorization, updatePost);
usersRouter.delete("/posts/:id", authorization, deletePost);

export default usersRouter;
