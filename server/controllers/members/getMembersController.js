const UserData = require("../../model/UserData");

const getMembersController = async (req, res) => {
  const action = req.query.action;
  const username = req.query.username;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const sort = req.query.sort || "Popular";
  let sortBy;
  if (sort === "Alphabetical") {
    sortBy = { username: 1 };
  } else if (sort === "Last Active") {
    sortBy = { active: -1 };
  } else if (sort === "Newest") {
    sortBy = { registered: -1 };
  } else {
    sortBy = {
      followerCount: -1,
      postCount: -1,
      followingCount: 1,
      active: -1,
    };
  }

  console.log(page, sort, action, search);
  try {
    const user = await UserData.findOne({
      username: username,
    });
    let members;
    if (action === "all") {
      members = await UserData.find({
        username: { $regex: search, $options: "i" },
      })
        .collation({ locale: "en" })
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
    } else {
      const List = action === "followers" ? user.follower : user.following;
      members = await UserData.find({
        $and: [
          { username: { $in: List } },
          { username: { $regex: search, $options: "i" } },
        ],
      })
        .collation({ locale: "en" })
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
    }

    const MyUserFollowingList = user.following;
    const memberList = members.map((e) => {
      return {
        username: e.username,
        active: e.active,
        newest: e.registered,
        postCount: e.postCount,
        followerCount: e.followerCount,
        followingCount: e.followingCount,
        isfollow: MyUserFollowingList
          ? MyUserFollowingList.includes(e.username)
          : false,
      };
    });

    const response = {
      page: page + 1,
      limit,
      sort,
      memberList,
    };
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = getMembersController;
