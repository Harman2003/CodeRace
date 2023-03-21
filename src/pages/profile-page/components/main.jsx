import React from "react";
import { FaGithub as Git } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { HiTrendingUp as Trend } from "react-icons/hi";
import { AiFillWechat as Chat } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";


const Main = ({ userData }) => {
  const { username, fullname, rating, followers, following, github, linkedIn } = userData

  return (
    <div className="w-full mb-4 p-4 bg-white rounded-md shadow-sm font-poppins">
      <div className="flex justify-between">
        <div className="w-full flex">
          <img
            className="w-20 h-20 min-h-[80px] min-w-[80px] rounded-md overflow-hidden"
            onClick={() => setpopup(!popup)}
            src="/images/user.png"
            alt="user logo"
          />
          <div className="ml-4 flex flex-col max-w-[50%] overflow-scroll">
            <div className="text-orange-400 font-semibold text-sm">Master</div>
            <div className="text-lg sm:text-xl font-semibold leading-5">{fullname}</div>
            <div className="flex items-center text-xs text-yellow-600">
              <div>@{username}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col text-xs">
          <Link to={linkedIn} className="mb-2 p-2 rounded-lg bg-blue-600 text-white flex items-center">
            <BsLinkedin />
            <span className="ml-2">LinkedIn</span>
          </Link>
          <Link to={github} className="p-2 rounded-lg bg-black text-white flex items-center">
            <Git size={18} />
            <span className="ml-2">Github</span>
          </Link>
        </div>
      </div>
      <div className="flex overflow-x-auto text-xs mt-1">
        {IconText(Trend, "Rating", rating, "green")}
        {IconText(FaStar, "Followings", following, "gold")}
        {IconText(FaStar, "Followers", followers, "gold")}
      </div>
    </div>
  );
};

const IconText = (Icon, text, value, color) =>(
      <div className="flex items-center mr-2 my-1 p-2 text-gray-500 font-openSans hover:bg-gray-200 rounded-md bg-gray-100">
        <Icon size={20} color={color} />
        <span className="ml-2 font-semibold">
          {text} {value >= 0 ? ` ${value}` : ""}
        </span>
  </div>
      )

export default Main;
