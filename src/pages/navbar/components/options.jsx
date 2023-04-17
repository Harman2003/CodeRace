import React from "react";
import { MdOutlineExplore as Explore } from "react-icons/md";
import { BiBook, BiTrophy } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";

const Options = () => {
  return (
    <div className="sm:flex">
      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <Explore size={20} />
        <Link to={"/social"} className="ml-1">Social</Link>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BiBook size={20} />
        <Link to={"/problems"} className="ml-1">Problems</Link>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BiTrophy size={20} />
        <Link to={"/contests"} className="ml-1">Contests</Link>
      </div>

      <hr className="sm:hidden my-1" />

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BsChat size={20} />
        <Link to={"/chat"} className="ml-1">Chat</Link>
      </div>
    </div>
  );
};

export default Options;
