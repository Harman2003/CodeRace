import React from "react";
import { BiStore } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import Options from "./options";

const Profile = () => {
  return (

    <div className="absolute top-11 sm:top-9 sm:left-6 sm:-translate-x-full bg-black-gradient p-4 shadow-2xl rounded-lg z-10 text-gray-100">
      
      <div className="flex items-center">
        <img
          className="min-w-[80px] w-20 rounded-full overflow-hidden"
          onClick={() => setpopup(!popup)}
          src="/images/user.png"
          alt="user logo"
        />
        <div className="ml-4">
          <div className="text-xl font-semibold">Harman2003</div>
          <div className="text-xs text-yellow-600 italic">Compete to Earn</div>
        </div>
      </div>

      <div className="w-60 my-4 flex flex-wrap justify-center">
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </div>

      <div className="sm:hidden">
        <Options />
      </div>

      <hr className="my-1" />
      <div className="flex items-center">
        <BiStore size={20} />
        <span className="ml-1">Store</span>
      </div>

      <hr className="my-1" />
      <div className="flex items-center">
        <AiOutlineLogout size={20} />
        <span className="ml-1">Sign Out</span>
      </div>
    </div>
  );
};

const Box = () => {
  return <div className="bg-gray-gradient mb-2 ml-2 w-16 h-16 rounded-md"></div>;
};

export default Profile;
