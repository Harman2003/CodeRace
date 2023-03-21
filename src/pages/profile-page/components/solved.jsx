import React from "react";

const Solved = ({ userData }) => {
  
  const {easy, medium , hard}= userData
  return (
    <div className="h-52 flex-1 mb-4 p-4 bg-white rounded-md shadow-sm font-poppins">
      <div className="mb-4 text-gray-500 text-sm">Solved Problems</div>

      <div className="flex items-center justify-center">
        <div className="min-w-[80px] min-h-[80px] sm:min-w-[128px] sm:min-h-[128px] bg-purple-50 flex flex-col items-center justify-center rounded-full">
          <div className="text-3xl sm:text-4xl text-gradient font-bold">{easy + medium + hard}</div>{" "}
          <div className=" text-sm">Solved</div>
        </div>

        <div className="w-[75%] ml-4 sm:ml-16">
          {bar("Easy", easy, 100, "rgb(220 252 231)", "rgb(22 163 74)")}
          {bar("Medium", medium, 100, "rgb(254 249 195)", "rgb(202 138 4)")}
          {bar("Hard", hard, 100, "rgb(254 226 226)", "rgb(220 38 38)")}
        </div>
      </div>
    </div>
  );
}

const bar = (difficulty, solved, total, fadecolor, darkColor) => {
  let done = `${solved * 100 / total}%`;

    return ( 
        <div className="my-3">
          <div>
            <span className="mr-6 text-sm text-gray-500 font-openSans">
              {difficulty}
            </span>
            <span className="font-poppins">
              {solved}
            </span>
                <span className="text-sm text-gray-300"> /{total}</span>
          </div>
        <div className={"h-[5px] rounded-full"} style={{backgroundColor: fadecolor}}>
          <div className={"h-full rounded-full"} style={{ backgroundColor: darkColor, width:done}}></div>
            </div>
        </div>
    )}

export default Solved;
