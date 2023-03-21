const PostData = require("../../model/Post");

//handle lazy loading & multiple sorted ways to get posts
const getPostController = async (req, res) => {
    const list = await PostData.find({});
    res.status(201).send(list);
}

module.exports = getPostController;
