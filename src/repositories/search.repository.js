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
