const UserData = require("../../model/UserData");

const FriendController = async (req, res) => {
  const action = req.query.action;
  const { myUsername, memberUsername } = req.body;
  const myUser = await UserData.findOne({ username: myUsername });
  const member = await UserData.findOne({ username: memberUsername });
  if (!member) return res.sendStatus(404);

  if (action === "add") {
    try {
      const isAlreadyFriend = myUser.following.includes(memberUsername);

      if (isAlreadyFriend) {
        return res.sendStatus(201);
      }

      myUser.following.push(memberUsername);
      myUser.followingCount++;
      await myUser.save();
      member.follower.push(myUsername);
      member.followerCount++;
      await member.save();
      console.log(member);
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    try {
      let followingList = myUser.following;
      followingList = followingList.filter((user) => user != memberUsername);

      // if member not present in the list
      if (myUser.following.length == followingList.length) {
        return res.sendStatus(201);
      }
        myUser.followingCount--;

      myUser.following = followingList;
      await myUser.save();
      console.log('huaaaa')

      let followerList = member.follower;
      followerList = followerList.filter((user) => user != myUsername);
      member.follower = followerList;
      member.followerCount--;
      await member.save();
      console.log(member);
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

module.exports = FriendController;
