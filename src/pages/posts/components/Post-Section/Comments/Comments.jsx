import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { axiosPrivate } from "../../../../../setup/api/axios";
import { RxPaperPlane as SubmitIcon } from "react-icons/rx";
import useSubmit from "../../../../../setup/hooks/useSubmit";
import useAuth from "../../../../../setup/hooks/useAuth";
import TextareaAutosize from "react-textarea-autosize";
import { List } from "react-content-loader";
import Loader from "../../../../Loader/ThreeDots";

const Comments = ({ id }) => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [submit, loading, status, setStatus] = useSubmit();
  const { auth } = useAuth();

  useEffect(() => {
    if (status === 201) {
      setList((prev) => [
        ...prev,
        { username: auth.user, data: text, createdAt: new Date() },
      ]);
      setStatus(0);
      setText("");
    }
  }, [loading]);

  const { isLoading } = useQuery(
    "getComments",
    async () => {
      const response = await axiosPrivate.get(`api/post/comment/${id}` , {params:{username:auth.user}});
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setList(data);
      },
    }
  );

  if (isLoading) {
    return <div>
      <Loader />
    </div>
  }

  return (
    <div>
      <div className="flex items-center bg-slate-100 rounded-full my-3 py-1 px-2">
        <img
          className="min-w-[32px] w-8 h-8 rounded-full overflow-hidden m-1"
          src="/images/user.png"
          alt="user logo"
        />
        <TextareaAutosize
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-sm flex-grow mx-2 my-0.5 h-10 rounded-md py-3 px-1 resize-none focus:outline-0"
        />
        <button className="focus:outline-offset-2 focus:scale-125"
          onClick={() => {
            if (!text) {
              return;
            }
            submit("api/post/comment", {
              body: {username:auth.user, postId: id, comment: text },
              query: {
                params: {
                  action: "comment",
                  username: auth.user,
                },
              },
            });
          }}
        >
          <SubmitIcon className="cursor-pointer text-gray-500 hover:text-gray-700 focus:text-gray-700" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {list.map((e, i) => CommentItem(e.username, e.data, e.createdAt, i))}
      </div>
    </div>
  );
};

function CommentItem(username, comment, createdAt, i) {
  const timeInSeconds = Date.now() - new Date(createdAt).getTime();
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const millisecondsInHour = 1000 * 60 * 60;
  let timeElapsed;

  if (timeInSeconds < millisecondsInDay) {
    timeElapsed = Math.floor(timeInSeconds / millisecondsInHour);
    if (timeElapsed === 0) timeElapsed = "Just now";
    else timeElapsed += " h ago";
  } else {
    timeElapsed = Math.floor(timeInSeconds / millisecondsInDay) + " d ago";
  }
  return (
    <div key={i} className="hover:bg-slate-50 flex mb-1">
      <img
        className="cursor-pointer min-w-[32px] w-8 h-8 rounded-full overflow-hidden m-1"
        src="/images/user.png"
        alt="user logo"
      />
      <div>
        <span className="mx-1 font-semibold text-sm">{username}</span>
        <span className="text-sm">{comment}</span>
        <div className="text-xs text-gray-400">{timeElapsed}</div>
      </div>
    </div>
  );
}
export default Comments;
