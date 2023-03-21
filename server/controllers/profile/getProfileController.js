const UserData = require("../../model/UserData");
const getProfileController = async (req, res) => {
  const username = req.query.username;

  const User = await UserData.findOne({ username: username });
  if (!User) return res.sendStatus(404);

  const UserObj = {
    username: User.username,
    fullname: User.fullname,
    skills: User.skills,
      bio: User.bio,
    email:User.email,
    showEmail: User.showEmail,
    institute: User.institute,
    rating: User.rating,
    easy: User.problemSolved.easy,
    medium: User.problemSolved.medium,
    hard: User.problemSolved.hard,
    followers: User.follower.length,
    following: User.following.length,
    tokens: User.tokens,
    github: User.github,
    linkedIn: User.linkedIn, 
  };

  res.status(201).json({ UserData: UserObj });
};

module.exports = getProfileController;
