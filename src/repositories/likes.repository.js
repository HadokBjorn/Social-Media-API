import { db } from "../database/database.connections.js";

export function likeDB(userId, postId) {
    return db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1,$2)`, [
        userId,
        postId
    ]);
}

export function getLikesDB(postId) {
    return db.query(`
    SELECT id AS post_id, 
    (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS num_likes,
        users.username AS last_liker
    FROM posts
    LEFT JOIN likes ON posts.id = likes.post_id
    LEFT JOIN users ON likes.user_id = users.id
    WHERE posts.id = <post_id>
    ORDER BY likes.created_at DESC
    LIMIT 2;`, [
        postId
    ]);
}