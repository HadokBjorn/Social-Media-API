import { db } from "../database/database.connections.js";

export function likeDB(userId, postId) {
    return db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1,$2)`, [
        userId,
        postId
    ]);
}