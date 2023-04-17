import React, { useState } from "react";
import Notification from "./components/notification";
import Profile from "./components/profilepopup";
import Options from "./components/options";
import {BiMenu, BiX} from "react-icons/bi"

const Navbar = () => {
  const [popup, setpopup] = useState(false);

  return (
    <div className="flex relative h-14 justify-between items-center bg-white border-b-[1px]">

      <div className="block sm:hidden ml-4" onClick={() => setpopup(!popup)}>
        {popup ? <><BiX size={26} /><Profile/></> : <BiMenu size={26} />}
      </div>
      
      <div className=" ml-6 text-2xl">CodeRace</div>
      <div className="hidden sm:block">
        <Options />
      </div>

      <Notification />

      <div className="relative hidden sm:block">
        <img
          className=" mr-28 w-6 h-6 rounded-full bg-black overflow-hidden"
          onClick={() => setpopup(!popup)}
          src="/images/user.png"
          alt="user logo"
        />
        {popup && <Profile />}
      </div>

      {/* If Not Auth */}

      {/* <div className="ml-auto mr-16">
        <span className="text-blue-900">Register</span> or{" "}
        <span className="text-blue-900">Sign In</span>
      </div> */}
    </div>
  );
};

export default Navbar;
