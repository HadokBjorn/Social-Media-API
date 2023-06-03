import bcrypt from "bcrypt";
import { getUsers, getPosts } from "../repositories/search.repository.js";

export async function getUserSearch(req, res) {
    const { search } = req.body
    let compatibleUsers = [];
    try {
        const users = await getUsers()
        const availableUsers = users.rows
        for (let i = 0; i < availableUsers.length; i++) {
            let item = availableUsers[i];
            if (item.includes(search)) {
                compatibleUsers.push(item)
            }
        }
        return res.send(compatibleUsers)
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getUserPosts(req, res) {
    const { id } = req.body;
    try {
        const result = await getPosts(id)
        const posts = result.rows
        return res.send(posts)

    } catch (err) {
        res.status(500).send(err.message);
    }

}