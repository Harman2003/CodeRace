import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Post-Section/AllPosts/Posts";
import Stats from "./components/Sidebars/Stats";
import SideProfile from "./components/Sidebars/SideProfile";
import Members from "./components/Members/Members";

const PostPage = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex ">
      <SideProfile />

      <div className="bg-white h-full flex-grow md:flex overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/members" element={<Members />} />
        </Routes>
        <Stats />
      </div>
    </div>
  ) 
}

export default PostPage;
