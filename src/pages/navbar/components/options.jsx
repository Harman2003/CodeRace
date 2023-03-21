import React from "react";
import { MdOutlineExplore as Explore } from "react-icons/md";
import { BiBook, BiTrophy } from "react-icons/bi";
import { BsChat, BsCode } from "react-icons/bs";

const Options = () => {
  return (
    <div className="sm:flex">
      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <Explore size={20} />
        <span className="ml-1">Explore</span>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BiBook size={20} />
        <span className="ml-1">Problems</span>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BiTrophy size={20} />
        <span className="ml-1">Contest</span>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BsCode size={20} />
        <span className="ml-1">Compete 1vs1</span>
      </div>

      <hr className="sm:hidden my-1" />
      <div className="sm:ml-6 sm:text-sm flex items-center">
        <BsChat size={20} />
        <span className="ml-1">Discuss</span>
      </div>
    </div>
  );
};

export default Options;
