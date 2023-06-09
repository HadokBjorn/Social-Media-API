import { createCommentDB, getCommentsDB } from "../repositories/comments.repository.js";

export async function createComment(req, res) {
	const { comment } = req.body;
	const { id } = req.params;
	const userId = res.locals.user.id;

	try {
		await createCommentDB({ comment, id, userId });
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
}

export async function getComments(req, res) {
	const { id } = req.params;
	try {
		const comments = await getCommentsDB(id);
		if (comments.rowCount === 0) return res.status(404).send("Ainda não há comentários");
		res.status(200).send(comments.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
}
