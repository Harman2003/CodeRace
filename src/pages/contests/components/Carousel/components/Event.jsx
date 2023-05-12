import React from "react";
import Countdown from "react-countdown";

const Event = () => {
  return (
    <div className="flex flex-col bg-green-200 sm:h-80 h-60 mx-2 sm:bg-contest-lg bg-contest-sm bg-center bg-no-repeat bg-cover sm:p-10 p-3">
      <div className="max-w-fit sm:gap-4 gap-1 grid grid-cols-1">
        <div className="text-orange-600 text-xs">REGISTRATION OPENED</div>
        <div className="sm:text-3xl text-lg font-bold text-gray-100">
          Leader Cup #7
        </div>
        <Countdown
          date={1683902100000}
          renderer={renderer}
          autoStart={true}
          zeroPadDays={"3"}
        />
      </div>
      <button className="max-w-fit sm:mt-auto mt-3 bg-orange-gradient p-2 rounded-md text-gray-200">
        Register
      </button>
    </div>
  );
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <div className="grid gap-3 grid-flow-col">
      <div className="flex flex-col justify-center items-center bg-orange-texture text-white px-4 sm:py-1 rounded-md">
        <div className="sm:text-3xl text-xl">26</div>
        <div>Jun</div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="bg-black-gradient p-2 rounded-md shadow-lg text-gray-100 text-lg">
          {days}
        </div>
        <div className="text-gray-100">Day</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-black-gradient p-2 rounded-md shadow-lg text-gray-100 text-lg">
          {hours}
        </div>
        <div className="text-gray-100">Hrs</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-black-gradient p-2 rounded-md shadow-lg text-gray-100 text-lg">
          {minutes}
        </div>
        <div className="text-gray-100">Min</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-black-gradient p-2 rounded-md shadow-lg text-gray-100 text-lg">
          {seconds}
        </div>
        <div className="text-gray-100">Sec</div>
      </div>
    </div>
  );
};

export default Event;
