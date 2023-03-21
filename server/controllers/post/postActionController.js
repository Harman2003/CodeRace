const CommentData = require('../../model/Comments');
const postActionController = async (req, res) => {
    const { username, postId, comment } = req.body;
    const commentObj = {
        username: username,
        data: comment,
        createdAt: new Date()
    }

    try {
        const postComment = await CommentData.findOne({ postId: postId });
        if(!postComment)return res.sendStatus(404)
        postComment.comments.push(commentObj);
        await postComment.save()
        res.sendStatus(201);
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
}

module.exports = postActionController;