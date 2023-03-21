import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/createPost/CreatePost";
import Posts from "./components/allPosts/Posts";
import Stats from "./components/Stats";

const PostPage = () => {
  const [postData, setpostData] = useState([]);

  return (
    <div className="w-full h-[calc(100vh-40px)] flex justify-center">
      <Sidebar />
      <div className=" w-[50%] h-full  overflow-scroll">
        <CreatePost setpostData={setpostData} />
        <Posts postData={postData} setpostData={setpostData} />
      </div>
      <Stats />
    </div>
  );
};

export default PostPage;
