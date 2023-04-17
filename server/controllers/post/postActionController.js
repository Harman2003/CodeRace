const CommentData = require("../../model/Comments");
const PostData = require("../../model/Post");
const UserData = require("../../model/UserData");
const postActionController = async (req, res) => {
  const action = req.query.action;

  if (action === "comment") {
    const { username, postId, comment } = req.body;
    const commentObj = {
      username: username,
      data: comment,
      createdAt: new Date(),
    };

    try {
      const postComment = await CommentData.findOne({ postId: postId });
      if (!postComment) return res.sendStatus(404);
      postComment.comments.push(commentObj);
      await postComment.save();
      const post = await PostData.findOne({ _id: postId });
      post.countComments = post.countComments + 1;
      await post.save();
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  } else if (action === "upvote") {
    const { username, postId, addOne } = req.body;

    try {
      const post = await PostData.findOne({ _id: postId });
      if (!post) return res.sendStatus(300);
      post.countLikes = post.countLikes + (addOne ? 1 : -1);
      await post.save();

      const user = await UserData.findOne({ username: username });
      let likeList = user.likedpost;
      if (!likeList) likeList = [];
      if (addOne) {
        likeList.push(postId);
      } else {
        likeList = likeList.filter((id) => id != postId);
      }
      user.likedpost = likeList;
      await user.save();
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  } else if (action === "save") {
    const { username, postId, addOne } = req.body;
    try {
      const user = await UserData.findOne({ username: username });

      let savedList = user.savedpost;
      // if (!savedList) savedList = [];
      if (addOne) {
        console.log("saved");
        savedList.push(postId);
      } else {
        savedList = savedList.filter((id) => id != postId);
        console.log("removed");
      }
      user.savedpost = savedList;
      await user.save();
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    const { postId } = req.body;
    try {
      const post = await PostData.findOne({ _id: postId });
      post.countShare = post.countShare + 1;
      await post.save();
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

module.exports = postActionController;
