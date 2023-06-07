import bcrypt from "bcrypt";
import { getUsers, getPosts, getUserById } from "../repositories/search.repository.js";

export async function UserSearch(req, res) {
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
    const id = parseInt(req.params);
    try {
        const result1 = await getPosts(id)
        const result2 = await getUserById(id)
        const posts = result1.rows
        posts.push(result2.rows[0])

    } catch (err) {
        res.status(500).send(err.message);
    }

}