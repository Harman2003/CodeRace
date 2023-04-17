const PostData = require("../../model/Post");
const UserData = require("../../model/UserData");

//handle lazy loading & multiple sorted ways to get posts
const getPostController = async (req, res) => {
  const action = req.query.action || "all";
  const username = req.query.username;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "newest";
  let sortBy;
  if (sort === "oldest") {
    sortBy = { createdAt: 1 };
  } else if (sort === "newest") {
    sortBy = { createdAt: -1 };
  } else {
    sortBy = {
      countLikes: -1, countComments: -1 , countShare: -1, createdAt: -1
    }
  }

  console.log(page, sort, action)
  try {
    const userObj = await UserData.findOne({ username: username });
    const userLikedPosts = userObj.likedpost;
    const userSavedPosts = userObj.savedpost;

    let list;
    if (action === 'all') {
      if (sort === "trending") {
        const midNightDate = new Date();
        midNightDate.setHours(0, 0, 0, 0);
    
        list = await PostData
          .find({ createdAt: { $gt: midNightDate } })
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit);
      }
      else {
        list = await PostData.find({})
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit)
      }
    }
    else {
      const result = action === "liked" ? userObj.likedpost : userObj.savedpost;
      list = await PostData.find({ _id: { $in: result } })
        .collation({ locale: "en" })
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
    }
   
    const allPosts = list.map((post) => {
      return {
        _id: post._id,
        createdAt: post.createdAt,
        username: post.username,
        data: post.data,
        countComments: post.countComments,
        countLikes: post.countLikes,
        countShare: post.countShare,
        isLiked: userLikedPosts ? userLikedPosts.includes(post._id) : false,
        isSaved: userSavedPosts ? userSavedPosts.includes(post._id) : false,
      };
    });
     console.log("postlength", allPosts.length);
    res.status(201).send(allPosts);
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

module.exports = getPostController;
