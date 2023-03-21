import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Discussion from "./components/Discussion";
import Solution from "./components/Solution";
import Submission from "./components/Submission";
import Description from "./components/Description";
import VerifyAuth from "../../../setup/VerifyAuth";

const problemCF = ({ id }) => {
  const location = useLocation();
  const [isActive, setActive] = useState(3);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("discussion")) setActive(1);
    else if (path.includes("solution")) setActive(2);
    else if (path.includes("submission")) setActive(3);
    else setActive(0);
  }, [location]);

  
  const navBox = 
    "flex select-none justify-center whitespace-nowrap rounded-t-[5px] px-4 py-[10px] text-xs";

  return (
    <div className="h-full flex flex-col">
      {/*Problem Navbar */}
      <div className="h-11 w-full pt-2 flex">
        <div
          className={navBox}
          style={{ backgroundColor: isActive == 0 ? "white" : "" }}
        >
          <Link to="description">Description</Link>
        </div>
        <div
          className={navBox}
          style={{ backgroundColor: isActive == 1 ? "white" : "" }}
        >
          <Link to="discussion">
          Discussion
          </Link>
        </div>
        <div
          className={navBox}
          style={{ backgroundColor: isActive == 2 ? "white" : "" }}
        >
          <Link to="solutions">
          Solutions
          </Link>
        </div>
        <div
          className={navBox}
          style={{ backgroundColor: isActive == 3 ? "white" : "" }}
        >
          <Link to="submissions">
          Submissions
          </Link>
        </div>
      </div>

      {/* Problem */}
      <Routes>
        <Route path="/" element={<Description id={id} />} />
        <Route path="/description" element={<Description id={id} />} />
        <Route path="/discussion" element={<Discussion id={id} />} />
        <Route path="/solutions" element={<Solution id={id} />} />
        <Route element={<VerifyAuth/>}>
          <Route path="/submissions" element={<Submission id={id} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default problemCF;
