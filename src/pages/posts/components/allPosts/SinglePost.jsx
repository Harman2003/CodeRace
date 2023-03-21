import React, { useState } from "react";
import Comments from "./Comments";
import row from "../SingleRow";
import TextareaAutosize from "react-textarea-autosize";
import { BiUpvote as Upvote } from "react-icons/bi";
import { RiChat3Line as Comment } from "react-icons/ri";
import { HiOutlineShare as Share } from "react-icons/hi";
import { FiBookmark as Save } from "react-icons/fi";

const SinglePost = ({ post }) => {
    const { _id, username, createdAt, data } = post;
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
  const styles = isComment
    ? "text-gray-500 mr-3 scale-[1.3] text-gray-600 shadow-inner rounded-md"
    : "text-gray-500 mr-3 hover:text-gray-600 grow-effect";

  return (
    <div className="h-fit mt-4 pt-4 pb-2 px-3  bg-white rounded-2xl font-poppins">
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

      <hr className="my-3 border-gray-100" />

      {/* bottom */}
      <div>
        <div className="flex items-center">
          <Upvote
            size={21}
            className="text-gray-500 mr-3 grow-effect hover:text-gray-600"
          />
          <Comment
            size={21}
            className={styles}
            onClick={() => setIsComment((prev) => !prev)}
          />
          <Share
            size={21}
            className="text-gray-500 mr-3 grow-effect hover:text-gray-600"
          />
          <Save
            size={20}
            className="text-gray-500 ml-auto grow-effect hover:text-gray-600"
          />
        </div>
        <div>

                  {isComment && <><hr className="mt-3 mb-2 border-gray-100" /> <Comments id={_id} /></>}
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
        <div className=" max-h-96 overflow-y-scroll ">
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
