import React from "react";
import { Link } from "react-router-dom";

const Singlerow = ({ name, contestId, index, tag, rating, color }) => {
  const bgColor = color % 2 ? "white" : "rgb(249 250 251)";
  return (
    <>
      <div className="flex" style={{ backgroundColor: bgColor }}>
        <div className="w-[10%] h-10 m-1 py-1"></div>
        <Link
          to={contestId + "_" + index}
          className="cursor-pointer hover:text-blue-700 w-[30%] h-10 m-1 py-1 whitespace-nowrap"
        >
          {name}
        </Link>
        <div className="w-[35%] h-10 m-1 py-1">
          <div className="relative h-6 mb-1 w-full flex flex-wrap whitespace-nowrap overflow-y-hidden hover:overflow-y-visible hover:z-10">
            {tag.map((e, i) => Tags(e, i))}
          </div>
        </div>
        <div className=" w-[15%] h-10 m-1 py-1 ">
          <div
            className="max-w-fit px-2 rounded-lg"
            style={{
              backgroundColor: !rating
                ? ""
                : rating <= 1300
                ? "rgb(220 252 231)"
                : rating <1600
                ? "rgb(254 249 195)"
                : "rgb(254 226 226)",
              color: !rating
                ? ""
                : rating <= 1300
                ? "rgb(22 163 74)"
                : rating < 1600
                ? "rgb(202 138 4)"
                : "rgb(220 38 38)",
            }}
          >
            {!rating
              ? "-"
              : rating <= 1300
              ? "Easy"
              : rating < 1600
              ? "Medium"
              : "Hard"}
          </div>
        </div>
        <div className="w-[10%] h-10 m-1 py-1">{rating ? rating : "-"}</div>
      </div>
      <hr />
    </>
  );
};

const Tags = (value, i) => {
  return (
    <div key={value+i}  className="bg-gray-100 p-1 mx-1 rounded-full text-xs">{value}</div>
  );
};

export default Singlerow;
