import { Router } from "express";
import { getUserSearch, getUserPosts } from "../controllers/search.controllers.js";

const searchRouter = Router();

searchRouter.get("/search", getUserSearch);
searchRouter.get("/user/:id", getUserPosts);

export default searchRouter;