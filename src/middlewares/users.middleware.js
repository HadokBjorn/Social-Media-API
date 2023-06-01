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
		const { id, name } = user.rows[0];
		const oneHour = 3600; //one hour in seconds
		const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: oneHour });
		await deleteExpiredSessionDB(id, token);

		res.locals.infos = { id, token };

		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
}
