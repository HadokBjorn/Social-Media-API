import { likeDB } from "../repositories/likes.repository";

export async function like(req, res) {
    const postId = req.params;
    const userId = res.locals.user.id;
    await likeDB(postId, userId);
}