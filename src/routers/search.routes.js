import { Router } from "express";
import { UserSearch, getUserPosts } from "../controllers/search.controllers.js";

const searchRouter = Router();

searchRouter.post("/search", UserSearch);
searchRouter.get("/user/:id", getUserPosts);

export default searchRouter;