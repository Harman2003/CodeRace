import React from "react";
import People from "./People";

const Stats = () => {
  return (
    <div className="md:w-[30%] md:h-full h-56 md:sticky overflow-y-auto md:top-0 border-l-[1px] px-[15px] py-[30px] md:p-[30px] md:pb-[70px]">
      <People />

      {/* Footer */}
      <div className="flex my-4">
        <div className="text-xs text-gray-500 mr-2">Home</div>
        <div className="text-xs text-gray-500 mr-2">About Us</div>
        <div className="text-xs text-gray-500 mr-2">Contact</div>
        <div className="text-xs text-gray-500 mr-2">© Copyright 2023</div>
      </div>
    </div>
  );
};

export default Stats;
