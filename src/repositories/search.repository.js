import { db } from "../database/database.connections.js";

export function getUsers() {
    return db.query(`SELECT * FROM users `);
}

export function getPosts(id) {
    return db.query(`SELECT * FROM posts WHERE user_id = $1 `, [id])
}

export function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id= $1 `, [id]);

}

export function insertFollow(user_id, follower_id){
    return db.query(`INSERT INTO followers (user_id, follower_id) VALUES ($1, $2)`,[user_id, follower_id])
}

export function deleteFollow(id){
    return db.query(`DELETE FROM followers WHERE id=$1 `,[id])
}

export function searchFollow(user_id, follower_id){
    return db.query(`SELECT * FROM followers WHERE user_id=$1 AND WHERE follower_id=$2`, [user_id,follower_id])
}
