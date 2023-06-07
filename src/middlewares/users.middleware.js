import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { deleteExpiredSessionDB, getUserByEmailDB } from "../repositories/users.repository.js";

dotenv.config();

export async function validateLogin(req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await getUserByEmailDB(email);
		if (user.rowCount === 0) return res.sendStatus(401);
		const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
		if (!correctPassword) return res.sendStatus(401);
		const { id, username, image } = user.rows[0];
		const oneHour = 3600; //one hour in seconds
		const token = jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: oneHour });
		await deleteExpiredSessionDB(id, token);

		res.locals.infos = { id, token, username, image };

		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
}
