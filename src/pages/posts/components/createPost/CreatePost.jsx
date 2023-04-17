import React, { useRef, useState } from "react";
import { BsCodeSlash as CodeIcon } from "react-icons/bs";
import { AiOutlineAppstoreAdd as PlusIcon } from "react-icons/ai";
import { IoTextOutline as TextIcon } from "react-icons/io5";
import { BiTable as Table } from "react-icons/bi";
import { RxCrossCircled as X } from "react-icons/rx";
import { RxPaperPlane as SubmitIcon } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline as Done } from "react-icons/io";

import ProblemModal from "./ProblemModal";
import TextareaAutosize from "react-textarea-autosize";
import CodeModal from "./CodeModal";
import row from "../Post-Section/SinglePost/TableRow";
import useSubmit from "../../../../setup/hooks/useSubmit";
import useAuth from "../../../../setup/hooks/useAuth";
import { useEffect } from "react";

const CreatePost = ({ setpostData }) => {
  const [postList, setList] = useState([""]);
  const [showIcons, setShowIcons] = useState(false);
  const [isModal, setIsModal] = useState("");
  const boxRef = useRef();
  const [submit, isLoading, status, setStatus] = useSubmit();
  const { auth } = useAuth();

  // posted shows only first time because the page is not re-rendering so it just invisible and not showing again
  // data not showing in the list until reloaded

  //solved above, but change the code and don't use status to show posted popup , rather just immediately make status 0 , use something else for popup

  useEffect(() => {
    if (status === 201) {
      setpostData((prev) => [
        ...prev,
        {
          username: auth.user,
          createdAt: new Date(),
          data: postList,
          countComments: 0,
          countLikes: 0,
          countShare: 0,
          countSaved: 0,
        },
      ]);
      setList([""])
      setTimeout(() => {
        setStatus(0);
      }, 3000);
    }
  }, [isLoading])
 
  return (
    <div className="relative">
      <div className="relative min-h-[120px] bg-white rounded-lg my-10 mb-16 p-2 z-10">
        <div className="font-semibold text-sm text-gray-600">
          Post Something
        </div>
        <hr className="border-gray-100 my-2" />
        <div className="flex">
          <img
            className="min-w-[40px] w-10 h-10 rounded-full overflow-hidden m-1"
            onClick={() => setpopup(!popup)}
            src="/images/user.png"
            alt="user logo"
          />
          <div ref={boxRef} className="w-full mx-2 mt-1 flex flex-col">
            {/* text/collection/code */}
            {postList.map((e, i) => postListElement(i, e))}
            <button
              disabled={postList[0] && !isLoading ? false : true}
              onClick={() => {
                submit("api/post", {
                  body: {
                    list: postList,
                  },
                  query: {
                    params: { username: auth.user },
                  },
                });
              }}
              className="cursor-pointer ml-auto mr-7 mt-2"
            >
              <SubmitIcon
                size={20}
                color={postList[0] && !isLoading ? "black" : "lightgray"}
                className="grow-effect"
              />
            </button>
          </div>

          {/* Icons */}
          <div>
            <PlusIcon
              title="Widgets"
              size={20}
              color="gray"
              className="cursor-pointer my-2 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => setShowIcons(!showIcons)}
            />
            {showIcons && (
              <>
                <TextIcon
                  title="TextBox"
                  size={18}
                  className="text-gray-300 cursor-pointer my-2 grow-effect"
                  onClick={() => {
                    boxRef.current.scrollTop = boxRef.current.scrollHeight;
                    setShowIcons(false);
                    setList((prev) => [...prev, ""]);
                  }}
                />
                <CodeIcon
                  title="Widgets"
                  size={20}
                  className="text-gray-300 cursor-pointer my-2 grow-effect"
                  onClick={() => {
                    boxRef.current.scrollTop = boxRef.current.scrollHeight;
                    setShowIcons(false);
                    setIsModal("code");
                  }}
                />
                <Table
                  title="Collection"
                  size={18}
                  className="text-gray-300 cursor-pointer my-2 grow-effect"
                  onClick={() => {
                    boxRef.current.scrollTop = boxRef.current.scrollHeight;
                    setShowIcons(false);
                    setIsModal("problem");
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {isModal === "problem" && (
        <ProblemModal setList={setList} setIsModal={setIsModal} />
      )}
      {isModal === "code" && (
        <CodeModal setList={setList} setIsModal={setIsModal} />
      )}
      {/* Post Submitted Popup*/}
      {!isLoading && status === 201 && (
        <div className="animate-fade fixed flex items-center top-1 left-1/2 -translate-x-1/2 p-2 bg-green-100 text-green-700 rounded-full font-semibold  text-sm">
          {" "}
          <Done size={20} />
          <div>Posted Successfully</div>
        </div>
      )}
      {/* Server Error Popup*/}
      {!isLoading && status === 500 && (
        <div className="animate-fade fixed flex items-center top-1 left-1/2 -translate-x-1/2 p-2 bg-red-100 text-red-700 rounded-full font-semibold  text-sm">
          {" "}
          <X size={20} />
          <div>Please Try Again</div>
        </div>
      )}

      {/* Background Shades */}
      <div className="absolute w-[120%] h-[150%] translate-x-1/2 right-1/2 translate-y-1/2 bottom-1/2 bg-slate-50/50 z-0 rounded-full"></div>
      <div className="absolute w-[110%] h-[130%] translate-x-1/2 right-1/2 translate-y-1/2 bottom-1/2 bg-slate-100/50 z-0 rounded-full"></div>
      <div className="absolute w-[95%] h-full -bottom-2 translate-x-1/2 right-1/2 bg-slate-100 z-0 rounded-lg"></div>
    </div>
  );

  function postListElement(index, element) {
    return (
      <div key={index} className="flex items-center group mb-2">
        {typeof element === "string" ? (
          <TextareaAutosize
            value={element}
            onChange={(e) => {
              postList[index] = e.target.value;
              setList([...postList]);
            }}
            placeholder={
              index == 0 ? "What's on your mind?" : "Write some text here"
            }
            className="border-[1px] border-gray-100 rounded-md p-1 w-[96%] max-h-80 overflow-y-auto resize-none text-gray-600 placeholder:text-gray-400 focus:outline-0 transition ease-in hover:scale-[1.01] "
          ></TextareaAutosize>
        ) : Array.isArray(element) ? (
          <div className="w-[99%] my-2">
            {/* Navbar */}
            <div className="bg-gray-100 px-2 py-1 flex text-sm bg-black-gradient text-white rounded-sm">
              <div className="w-2/3">Problem</div>
              <div className="w-1/6">ContestID</div>
              <div className="w-1/6">Rating</div>
            </div>
            {/* List */}
            <div className=" max-h-96 overflow-y-auto overflow-x-hidden">
              {element.map((e, i) =>
                row(i, e.name, e.index, e.contestId, e.rating, false)
              )}
            </div>
          </div>
        ) : (
          <div className="border-[1px] border-gray-100 rounded-md p-1 w-[96%] max-h-80 overflow-y-auto resize-none text-gray-600 placeholder:text-gray-400 focus:outline-0 transition ease-in hover:scale-[1.01] ">{`\`${element.code}\``}</div>
        )}
        {postList.length > 1 && (
          <X
            size={20}
            className="text-gray-200 child invisible group-hover:visible cursor-pointer ml-1 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => {
              if (postList.length == 1) return;
              const list = postList.filter((e, i) => i != index);
              setList([...list]);
            }}
          />
        )}
      </div>
    );
  }
};

export default CreatePost;
