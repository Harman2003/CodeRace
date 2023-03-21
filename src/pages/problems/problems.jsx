import React from "react";
import Slider from "./components/Slider";
import Questions from "../questions/questions";
import Sidebar from "./components/sidebar";

const Problems = () => {

  return (
    <div className="flex w-[90%] h-[calc(100vh-40px)] mx-auto p-4 justify-between">
      <div className="flex flex-col w-[80%] h-[100%]">
        <Slider />
        <hr className="my-4" />
        <Questions/>
      </div>

      <div className="w-[18%] h-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Problems;
