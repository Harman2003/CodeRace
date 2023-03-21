const UserData = require("../../model/UserData");

const setProfileController = async (req, res) => {
  const username = req.query.username;
  const { UserObj } = req.body;
  console.log(UserObj)
  UserData.findOneAndUpdate(
    { username: username },
    {
      fullname: UserObj.fullname,
      skills: UserObj.skills,
      bio: UserObj.bio,
      email: UserObj.email,
      showEmail: UserObj.showEmail,
      institute: UserObj.institute,
      github: UserObj.github,
      linkedIn: UserObj.linkedIn,
    } 
  )
    .then((updatedDoc) => {
      if (updatedDoc) res.sendStatus(201);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.sendStatus(500);
    });

  //   const UserObj = {
  //     username: User.username,
  //     fullname: User.fullname,
  //     skills: User.skills,
  //     bio: User.bio,
  //     institute: User.institue,
  //     rating: User.rating,
  //     easy: User.problemSolved.easy,
  //     medium: User.problemSolved.medium,
  //     hard: User.problemSolved.hard,
  //     followers: User.follower.length,
  //     following: User.following.length,
  //     tokens: User.tokens,
  //     github: User.links.github,
  //     linkedIn: User.links.linkedIn,
  //   };
};

module.exports = setProfileController;
