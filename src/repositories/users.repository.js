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
