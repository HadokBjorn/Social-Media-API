import bcrypt from "bcrypt";
import { createUserDB } from "../repositories/users.repository.js";

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
