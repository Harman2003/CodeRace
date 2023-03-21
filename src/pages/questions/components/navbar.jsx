import React from "react";

const Navbar = () => {
    return (
      <>
        <div className="sticky top-0 z-10 flex bg-orange-gradient shadow-md rounded-t-sm">
          <div className="w-[10%] h-9 m-1 py-1">Status</div>
          <div className="w-[30%] h-9 m-1 py-1">Problem</div>
          <div className="w-[35%] h-9 m-1 py-1">Tags</div>
          <div className="w-[15%] h-9 m-1 py-1">Difficulty</div>
          <div className="w-[10%] h-9 m-1 py-1">Rating</div>
        </div>
      </>
    );
};

export default Navbar;
