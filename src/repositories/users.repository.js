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
