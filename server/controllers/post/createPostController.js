const PostData = require('../../model/Post');
const CommentData= require('../../model/Comments');

const createPostController = async (req, res) => {
    const {username, list} = req.body;
    const finalList = list.filter(e => {
        if (typeof e === 'string' && e.trim()==='') {
            return false;
        }
        return true;
    });

    const finalObj = {
        username: username,
        createdAt: new Date(),
        data: finalList,
        countComments: 0,
        countLikes: 0,
        countShare: 0,
        countSaved: 0
    }
    try {
        const post = await PostData.create(finalObj);
        await CommentData.create({
            postId: post._id,
            comments:[]
        })
        res.sendStatus(201);
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
}

module.exports = createPostController;