import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Post-Section/AllPosts/Posts";
import Stats from "./components/Sidebars/Stats";
import SideProfile from "../sidebar/SideProfile";
import Members from "./components/Members/Members";
import { CgFeed } from "react-icons/cg";
import { MdGroups as Group } from "react-icons/md";
import { BsFilePost as Post } from "react-icons/bs";
import { CgProfile as Profile } from "react-icons/cg";
import useAuth from "../../setup/hooks/useAuth";
import { useLocation } from "react-router-dom";

const PostPage = () => {
  const { auth } = useAuth();
  const path = useLocation().pathname;
  const selected = [
    path == "/social",
    path == "/social/members",
    path == "/social/my",
  ];

  return (
    <div className="w-full h-[calc(100vh-56px)] flex ">
      <SideProfile
        list={[
          { name: "Feed", path: "/social", icon: CgFeed, on: selected[0] },
          {
            name: "Members",
            path: "/social/members",
            icon: Group,
            on: selected[1],
          },
          {
            name: "My Profile",
            path: `/profile/${auth.user}`,
            icon: Profile,
            on: false,
          },
          { name: "My Posts", path: "/social/my", icon: Post, on: selected[2] },
        ]}
      />

      <div className="bg-white h-full flex-grow md:flex overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/members" element={<Members />} />
        </Routes>
        <Stats />
      </div>
    </div>
  );
};

export default PostPage;
