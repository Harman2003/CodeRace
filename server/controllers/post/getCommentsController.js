const CommentData = require("../../model/Comments");

const getCommentController = async (req, res) => {
  const postId = req.params.id;
  console.log(req.params);
  const Item = await CommentData.findOne({ postId: postId });
  console.log(Item.comments);
  if (!Item) return res.sendStatus(404);
  res.status(201).send(Item.comments);
};

module.exports = getCommentController;
