import React from "react";
import RightBar from "./RightBar";
import AllContest from "./AllContest";
import Slider from "./Carousel/Carousel";
const Main = () => {
  return (
    <div className="bg-white h-full md:flex md:w-[82%] sm:w-[calc(100vw-70px)] w-[calc(100vw-55px)] overflow-y-auto overflow-x-hidden">
      <div className="h-full md:w-3/4 p-2">
        <Slider />
        <AllContest />
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  );
};

export default Main;
