import bcrypt from "bcrypt";
import { getUsers, getPosts, getUserById , insertFollow, deleteFollow, searchFollow} from "../repositories/search.repository.js";

export async function UserSearch(req, res) {
    const { search } = req.body
    let compatibleUsers = [];

    try {
        const users = await getUsers()
        const availableUsers = users.rows
        for (let i = 0; i < availableUsers.length; i++) {
            let item = availableUsers[i].username;
            if (item.includes(search)) {
                compatibleUsers.push(availableUsers[i])
            }
        }
        return res.send(compatibleUsers)
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getUserPosts(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result1 = await getPosts(id)
        const result2 = await getUserById(id)
        const posts = result1.rows
        posts.push(result2.rows[0])
        return res.status(200).send(posts)

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function Follow(req,res){
    const {user_id, follower_id} = req.body
    try{
        await insertFollow(user_id, follower_id)
        const follow= await searchFollow(user_id,follower_id)
        let idt= follow.rows[0].id
        return res.status(200).send(idt)

    } catch(err){
        res.status(500).send(err.message);
    }
}

export async function Unfollow(req,res){
    const {id}= req.body
    try{
        const result= await deleteFollow(id)
        return res.sendStatus(200)

    } catch(err){
        res.status(500).send(err.message);
    }
}

export async function isFollowed(req,res){
    const {user_id, follower_id} = req.body;
    try{
        const follow= await searchFollow(user_id,follower_id)
        let idt= follow.rows[0].id
        if(idt){
            return res.status(200).send(true)
        }
        else{
            return res.status(200).send(false)
        }
    } catch(err){
        res.status(500).send(err.message);
    }
}