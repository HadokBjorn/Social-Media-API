import { db } from "../database/database.connections.js";

export async function getAllPosts(req, res) {
	try {
		const post = await db.query(
			`SELECT users.username, users.image, posts.* FROM posts JOIN users ON users.id=posts.user_id ORDER BY id DESC`
		);

		res.send(post.rows);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

export async function createPost(req, res) {
	const { link, description } = req.body;
	const { id } = res.locals.user;

	try {
		await db.query(
			`
        INSERT INTO posts (user_id, link, description)
        VALUES ($1, $2, $3)
      `,
			[Number(id), link, description]
		);

		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
}
