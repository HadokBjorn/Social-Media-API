import { Router } from "express";
import { UserSearch, getUserPosts, Follow, Unfollow, isFollowed } from "../controllers/search.controllers.js";

const searchRouter = Router();

searchRouter.post("/search", UserSearch);
searchRouter.get("/user/:id", getUserPosts);
searchRouter.post("/follow", Follow)
searchRouter.post("/unfollow", Unfollow)
searchRouter.post("/followed", isFollowed)

export default searchRouter;