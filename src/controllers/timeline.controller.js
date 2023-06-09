import { db } from "../database/database.connections.js";

export async function getAllPosts(req, res) {
	try {
		const post = await db.query(
			`SELECT
			  posts.*,
			  users.username,
			  users.image,
			  COALESCE(comment_counts.comment_count, 0) AS comment_count
			FROM
			  posts
			JOIN
			  users ON users.id = posts.user_id
			LEFT JOIN
			  (
			    SELECT
			      post_id,
			      COUNT(*) AS comment_count
			    FROM
			      comments
			    GROUP BY
			      post_id
			  ) AS comment_counts ON comment_counts.post_id = posts.id
			  ORDER BY (posts.created_at) DESC`
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
