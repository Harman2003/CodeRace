import React from "react";
import SideProfile from "../sidebar/SideProfile";
import Main from "./components/Main";
import { CgFeed } from "react-icons/cg";
import { VscDiffAdded as Add } from "react-icons/vsc";
import { CiBoxList as All } from "react-icons/ci";
import { VscHistory as History } from "react-icons/vsc";
import { IoSettingsOutline as Setting } from "react-icons/io5";


const Contest = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex ">
      <SideProfile
        list={[
          { name: "Contests", path: "/social", icon: All, on:false},
          {
            name: "Create",
            path: "/social/members",
            icon: Add,
            on: false,
          },
          {
            name: "History",
            path: `/profile/`,
            icon: History,
            on: false,
          },
          { name: "Settings", path: "/social/my", icon: Setting, on: false },
        ]}
      />
      <Main/>
    </div>
  );
};

export default Contest;
