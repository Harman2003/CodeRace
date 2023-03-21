import React from "react";
import { BsTrophyFill as Trophy } from "react-icons/bs";
import { FiExternalLink as Refer } from "react-icons/fi";

const History = () => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-md shadow-sm font-poppins">
      <div className=" mb-4 text-gray-500 text-sm">Match History</div>
      <div className="grow border-2 rounded-md p-4">
        {row()}
        <hr className="my-2" />
        {row()}
        <hr className="my-2" />
        {row()}
        <hr className="my-2" />
        {row()}
        <hr className="my-2" />
        {row()}
        <hr className="my-2" />
        {row()}
      </div>
    </div>
  );
};

const row = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mr-auto">
        <Trophy color="goldenrod" size={18}/>
      </div>
      <img
        className="w-6 h-6 rounded-full"
        onClick={() => setpopup(!popup)}
        src="/images/user.png"
        alt="user logo"
      />
      <span className="text-sm mx-1">Harman</span>
      <span className="text-xs text-gray-400">V/S</span>
      <span className="text-sm mx-1">Gurtaj</span>
      <img
        className="w-6 h-6 rounded-full"
        onClick={() => setpopup(!popup)}
        src="/images/user.png"
        alt="user logo"
      />
      <div className="ml-auto">
        <Refer color="blue" />
      </div>
    </div>
  );
};

export default History;
