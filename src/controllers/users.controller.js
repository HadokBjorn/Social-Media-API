import bcrypt from "bcrypt";
import {
	createSessionDB,
	createUserDB,
	deletePostDB,
	updatePostDB,
} from "../repositories/users.repository.js";

export async function signup(req, res) {
	const { username, image, email, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	try {
		await createUserDB({ username, image, email, hash });
		res.sendStatus(201);
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409);
		res.status(500).send(err.message);
	}
}
export async function login(req, res) {
	const { id, token } = res.locals.infos;
	try {
		await createSessionDB({ id, token });
		res.status(200).send({ token: token });
	} catch (err) {
		res.status(500).send(err.message);
	}
}
export async function updatePost(req, res) {
	const { id } = req.params;
	const { description } = req.body;
	const userId = res.locals.user.id;
	console.log(userId);
	try {
		await updatePostDB({ description, id, userId });
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
export async function deletePost(req, res) {
	const { id } = req.params;
	const userId = res.locals.user.id;
	console.log(userId);
	try {
		await deletePostDB({ id, userId });
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
