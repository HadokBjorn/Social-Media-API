import { db } from "../database/database.connections.js";

export function createCommentDB(body) {
	const { userId, id, comment } = body;
	return db.query(
		`
    INSERT INTO comments (user_id, post_id, comment)
    VALUES ($1, $2, $3)
  `,
		[Number(userId), Number(id), comment]
	);
}

export function getCommentsDB(id) {
	return db.query(
		`
    SELECT users.username, users.image, comments.*
    FROM users
    JOIN comments ON comments.user_id=users.id
    AND comments.post_id=$1
    ORDER BY (comments.created_at) DESC
    `,
		[Number(id)]
	);
}
