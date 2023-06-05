import { getLikesDB, likeDB } from "../repositories/likes.repository.js";

export async function like(req, res) {
    const postId = req.params;
    const userId = res.locals.user.id;

    try {
        await likeDB(postId, userId);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getLikes(req, res) {
    const postId = req.params;

    try {
        const result = await getLikesDB(postId, userId);
        if (result.rowCount > 0) {
            const { post_id, num_likes } = result.rows[0];

            res.send({
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