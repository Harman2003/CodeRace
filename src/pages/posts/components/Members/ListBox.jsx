import React, { useState } from "react";
import getActive from "../../util/getActive";
import useSubmit from "../../../../setup/hooks/useSubmit";
import useAuth from "../../../../setup/hooks/useAuth";
import { Link,useNavigate } from "react-router-dom";

const ListBox = ({
  username,
  active,
  postCount,
  followerCount,
  followingCount,
  isfollow,
}) => {
  const [submit, isLoading] = useSubmit();
  const [isFollow, setFollow] = useState(isfollow);
  const { auth } = useAuth();
  const navigate= useNavigate()
  const isMine = auth.user === username;

  return (
    <div className="flex flex-col items-center rounded-lg shadow-md h-80">
      <div className="flex flex-col items-center mt-6">
        <img
          className="min-w-[80px] w-20 h-20 rounded-full self-center"
          src="/images/user.png"
          alt="user logo"
        />
        <div className="text-lg font-semibold mt-2">{username}</div>
        <div className="text-gray-500">{getActive(active)}</div>
      </div>
      {/* User Stats */}
      <div className="self-center font-NunitoSans w-[92%] mt-6 flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <div>{postCount}</div>
          <div className="text-xs text-gray-400">Posts</div>
        </div>
        <div className="flex flex-col items-center">
          <div>{followerCount}</div>
          <div className="text-xs text-gray-400">Followers</div>
        </div>
        <div className="flex flex-col items-center">
          <div>{followingCount}</div>
          <div className="text-xs text-gray-400">Following</div>
        </div>
      </div>

      {isMine ? (
        <button
          className="my-4 border-[1px] rounded-full w-[60%] py-2 border-purple-700 shadow hover-purple-gradient"
          onClick={()=>navigate(`/profile/${auth.user}`)}
        >
          My Profile
        </button>
      ) : isFollow ? (
        <button
          className="my-4 border-[1px] rounded-full w-[60%] py-2 purple-gradient"
          onClick={handleUnfollow}
          disabled={isLoading}
        >
          Following
        </button>
      ) : (
        <button
          className="my-4 border-[1px] rounded-full w-[60%] py-2 border-purple-700 shadow hover-purple-gradient"
          onClick={handleFollow}
          disabled={isLoading}
        >
          Follow
        </button>
      )}
    </div>
  );

  async function handleFollow() {
    const res = await submit('/api/members/friends', { body: {myUsername:auth.user, memberUsername:username}, query: { params: { username: auth.user, action: 'add' } } });
    console.log(res);
    setFollow(true);
  }
  async function handleUnfollow() {
    const res = await submit("/api/members/friends", {
      body: { myUsername: auth.user, memberUsername: username },
      query: { params: { username: auth.user, action: "remove" } },
    });
    console.log(res);
    setFollow(false);
  }
};

export default ListBox;
