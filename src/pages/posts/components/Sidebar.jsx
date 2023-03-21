import React from "react";
import { CgFeed } from "react-icons/cg";
import { BsJournalBookmarkFill as Book } from "react-icons/bs";
import { MdGroups as Group } from "react-icons/md";
import { BsFilePost as Post } from "react-icons/bs";
import { CgProfile as Profile } from "react-icons/cg";
import { AiFillSetting as Setting } from "react-icons/ai";
import useAuth from "../../../setup/hooks/useAuth";


const Sidebar = () => {
  const {auth}= useAuth()
  return (
    <div className="bg-white w-[18%] h-full mr-auto shadow-sm font-poppins">
      <div className="flex border-[1px] my-3 mx-3 p-2 bg-slate-50 rounded-2xl transition-transform ease-in-out duration-500 hover:transform hover:origin-left hover:scale-x-[1.03]">
        <img
          className="min-w-[32px] w-8 h-8 rounded-full overflow-hidden m-1"
          onClick={() => setpopup(!popup)}
          src="/images/user.png"
          alt="user logo"
        />
        <div>
          <div className="font-bold text-xl">Harman Singh</div>
          <div className="text-xs text-gray-400">@{auth.user}</div>
        </div>
      </div>

      <div>
        {element("Feed", CgFeed)}
        {element("Collection", Book)}
        {element("Friends", Group)}
        {element("My Post", Post)}
        {element("Profile", Profile)}
        {element("Setting", Setting)}
      </div>
    </div>
  );
};

function element(value, Icon) {
  return (
    <div className="flex group items-center bg-white h-16 py-2 transition-transform ease-in-out duration-500 hover:transform hover:origin-left hover:scale-x-[1.03] hover:text-orange-500 rounded-lg hover:shadow-md">
      <div className="child relative right-1 w-2 h-2/3 rounded-full group-hover:bg-orange-500"></div>
      <Icon
        size={20}
        className="mx-2 text-gray-400 child group-hover:text-orange-500"
      />
      <div className="font-semibold">{value}</div>
    </div>
  );
}
export default Sidebar;
