import React, { useState } from "react";
import Comments from "../Comments/Comments";
import row from "./TableRow";
import actionHandler from "./actionHandler";
import useSubmit from "../../../../../setup/hooks/useSubmit";
import TextareaAutosize from "react-textarea-autosize";
import Animate from "./Animate";
import { BiUpvote as Upvote } from "react-icons/bi";
import { RiChat3Line as Comment } from "react-icons/ri";
import { HiOutlineShare as Share } from "react-icons/hi";
import { FiBookmark as Save } from "react-icons/fi";
import useAuth from "../../../../../setup/hooks/useAuth";

const SinglePost = ({ post }) => {
  const {
    _id,
    username,
    createdAt,
    data,
    countLikes,
    countComments,
    countShare,
    isLiked,
    isSaved,
  } = post;


  const [submit, isLoading, status, setStatus] = useSubmit();
  const { auth } = useAuth();
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-IN", options);

  const [isComment, setIsComment] = useState(false);
  const [isUpvote, setIsUpvote] = useState(isLiked);
  const [countUpvote, setcountUpvote] = useState(countLikes);
  console.log(countUpvote)
 
  const [isSave, setIsSave] = useState(isSaved);
  return (
    <div className="h-fit mt-4 pt-4 pb-2 px-3  rounded-2xl">
      {/* heading */}
      <div className="flex items-center">
        <img
          className="min-w-[40px] w-10 h-10 rounded-full overflow-hidden m-1"
          src="/images/user.png"
          alt="user logo"
        />
        <div className="mx-2">
          <div className=" font-bold">{username}</div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>

      {/* data */}
      <div className="mt-3">
        {data.map((element, i) => elementHandler(element, i))}
      </div>

      <hr className="my-3 border-gray-200" />

      {/* bottom */}
      <div>
        <div className="flex items-center">
          <div
            className="relative group flex items-center cursor-pointer transition-transform transform active:scale-105"
            style={{
              color: isUpvote ? "rgb(147 51 234)" : "rgb(107 114 128)",
            }}
            onClick={async () => {
              await actionHandler(
                "upvote",
                { username: auth.user, postId: _id, addOne: !isUpvote },
                submit
              );
              if (isUpvote) setcountUpvote((prev) => prev - 1);
              else setcountUpvote((prev) => prev + 1);
              setIsUpvote(!isUpvote);
            }}
          >
            <Animate /> {/* Sparkling Effect */}
            <Upvote size={25} className=" group-hover:text-purple-600 mr-1" />
            <div className="text-sm sm:text-md mr-2 sm:mr-3 group-hover:text-purple-600 whitespace-nowrap">
              {countUpvote + " Upvotes"}
            </div>
          </div>
          <div
            className="group flex items-center cursor-pointer transition-transform transform active:scale-[1.02]"
            onClick={() => setIsComment((prev) => !prev)}
            style={{
              color: isComment ? "rgb(147 51 234)" : "rgb(107 114 128)",
            }}
          >
            <Comment size={23} className="mr-1 group-hover:text-purple-600" />
            <div className="text-sm sm:text-md group-hover:text-purple-600 mr-2 sm:mr-3 whitespace-nowrap">
              {countComments ? countComments + " Comments" : "No Comment"}
            </div>
          </div>
          <div
            className="group flex items-center cursor-pointer transition-transform transform active:scale-[1.02]"
            onClick={() =>
              actionHandler(
                "share",
                { username: auth.user, postId: _id },
                submit
              )
            }
          >
            <Share
              size={21}
              className="ml-1 sm:ml-0 text-gray-500 mr-2 group-hover:text-purple-600 cursor-pointer"
            />
            <div className="hidden sm:block child text-gray-500  group-hover:text-purple-600 mr-3">
              {countShare ? countShare + " Share" : "Share"}
            </div>
          </div>
          <div
            className="relative ml-auto transition-transform transform active:scale-105"
            onClick={async () => {
              await actionHandler(
                "save",
                { username: auth.user, postId: _id, addOne: !isSave },
                submit
              );
              setIsSave(!isSave);
            }}
          >
            <Animate />
            <Save
              size={20}
              className="text-gray-400 hover:text-purple-600"
              style={{
                color: isSave ? "rgb(147 51 234)" : "rgb(107 114 128)",
              }}
            />
          </div>
        </div>
        <div>
          {isComment && (
            <>
              <hr className="mt-3 mb-2 border-gray-100" /> <Comments id={_id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function elementHandler(element, key) {
  if (typeof element === "string") {
    return (
      <TextareaAutosize
        key={key}
        readOnly={true}
        value={element}
        className="resize-none focus:outline-none"
      ></TextareaAutosize>
    );
  } else if (Array.isArray(element)) {
    return (
      <div key={key} className="w-[99%] my-2">
        {/* Navbar */}
        <div className="bg-gray-100 px-2 py-1 flex text-sm bg-black-gradient text-white rounded-sm">
          <div className="w-2/3">Problem</div>
          <div className="w-1/6">ContestID</div>
          <div className="w-1/6">Rating</div>
        </div>
        {/* List */}
        <div className=" max-h-96 overflow-y-auto overflow-x-hidden ">
          {element.map((e, i) =>
            row(i, e.name, e.index, e.contestId, e.rating, false)
          )}
        </div>
      </div>
    );
  } else {
    return <div key={key}>{element.code}</div>;
  }
}

export default SinglePost;
