import { getLikesDB, likeDB, unLikeDB } from "../repositories/likes.repository.js";

export async function like(req, res) {
    const postId = req.params.id;
    const userId = res.locals.user.id;

    try {
        await likeDB(postId, userId);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function unLike(req, res) {
    const postId = req.params.id;
    const userId = res.locals.user.id;

    try {
        const result = await unLikeDB(userId, postId);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getLikes(req, res) {
    const postId = req.params.id;

    try {
        const result = await getLikesDB(postId);
        if (result.rowCount > 0) {
            const { post_id, num_likes } = result.rows[0];

            return res.send({
                postId: post_id,
                numLIkes: num_likes,
                lastLiker: result.rows.map(liker => liker.last_liker)
            });
        }

        res.send({ postId, numLIkes: 0, lastLiker: [] });
    } catch (err) {
        res.status(500).send(err.message);
    }

}