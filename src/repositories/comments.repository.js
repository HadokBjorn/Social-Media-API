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

export function getCommentsDB(id, userId) {
	return db.query(
		`SELECT
		  users.username,
		  users.image,
		  comments.*,
		  CASE
		    WHEN followers.follower_id IS NOT NULL THEN TRUE
		    ELSE FALSE
		  END AS is_following
		FROM
		  users
		JOIN
		  comments ON comments.user_id = users.id
		  AND comments.post_id=$1
		LEFT JOIN
		  followers ON followers.follower_id = comments.user_id
		   AND followers.follower_id = $2
		ORDER BY
		  comments.created_at DESC;
		`,
		[Number(id), Number(userId)]
	);
}
