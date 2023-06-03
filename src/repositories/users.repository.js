import { db } from "../database/database.connections.js";

export function createUserDB(body) {
	const { username, image, email, hash } = body;
	return db.query(`INSERT INTO users (username, image, email, password) VALUES ($1,$2,$3,$4)`, [
		username,
		image,
		email,
		hash,
	]);
}

export function createSessionDB(body) {
	const { id, token } = body;
	return db.query(`INSERT INTO sessions (user_id, token) VALUES ($1,$2)`, [id, token]);
}
export function getUserByEmailDB(email) {
	return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}
export function deleteExpiredSessionDB(id, token) {
	return db.query(`DELETE FROM sessions WHERE user_id=$1 AND token !=$2 ;`, [Number(id), token]);
}
export function userLoggedDB(id, token) {
	return db.query(`SELECT * FROM sessions WHERE user_id=$1 AND token=$2`, [id, token]);
}
export function updatePostDB(body) {
	const { link, description, id, userId } = body;
	return db.query(
		`
		UPDATE posts SET link=$1, description=$2
		WHERE id=$3 AND user_id=$4;
	`,
		[link, description, Number(id), Number(userId)]
	);
}
export function deletePostDB(body) {
	const { id, userId } = body;
	return db.query(`DELETE FROM posts WHERE id=$1 AND user_id=$2;`, [Number(id), Number(userId)]);
}
