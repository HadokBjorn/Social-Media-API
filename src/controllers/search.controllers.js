import bcrypt from "bcrypt";
import { getUsers, getPosts, getUserById , insertFollow, deleteFollow, searchFollow, searchFollowBarVersion} from "../repositories/search.repository.js";

export async function UserSearch(req, res) {
    const {search} = req.body
    const id= parseInt(req.body.id)
    let compatibleUsers = [];
    let orderedU=[0];
    let followedIds=[];

    try {
        const users = await getUsers()
        const followedUsers= await searchFollowBarVersion(id)
        const availableUsers = users.rows

        for(let i=0;i < followedUsers.rows.length;i++){
            followedIds.push(followedUsers.rows[i].user_id)
        }


        for (let i = 0; i < availableUsers.length; i++) {
            let item = availableUsers[i].username;
            if (item.includes(search)) {
                compatibleUsers.push(availableUsers[i])
            }
        }

        for (let i=0; i < compatibleUsers.length; i++){
            let userId = compatibleUsers[i].id;
            res.send(compatibleUsers[i].username)
            for(let j=0; j < followedIds; j++){
                if( userId === followedIds[j]){
                    res.send("oi")
                }
            }
            res.send("ola")
        }

        for (let i=0; i < compatibleUsers.length; i++){
            let userId = compatibleUsers[i].id;
            for(let j=0; j < followedIds; j++){
                if(userId !== followedIds[j]){
                    orderedU.push(compatibleUsers[i])
                }
            }
        }

        orderedU.push(followedIds)

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
        let textId= idt.toString()
        return res.status(200).send(textId)

    } catch(err){
        res.status(500).send(err.message);
    }
}

export async function Unfollow(req,res){
    const {id}= req.body
    try{
        await deleteFollow(id)
        return res.sendStatus(200)

    } catch(err){
        res.status(500).send(err.message);
    }
}

export async function isFollowed(req,res){
    const {user_id, follower_id} = req.body;
    try{
        const follow= await searchFollow(user_id,follower_id)
        let idt= follow.rows[0].id.toString()
        if(idt){
            return res.status(200).send(idt) 
        }
        else{
            return res.status(200).send(0)
        }
    } catch(err){
        res.sendStatus(500);
    }
}