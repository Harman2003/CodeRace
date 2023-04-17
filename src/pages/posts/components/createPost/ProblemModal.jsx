import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import axios from "../../../../setup/api/axios";
import { RxCross1 as X } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { GiArchiveResearch } from "react-icons/gi";
import { MdDelete as Delete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


// Pending Work: Get all problems at your server and update on opening this modal

const ProblemModal = ({ setList, setIsModal }) => {
  const [popupList, setpopupList] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isIssue, setIssue] = useState(false);
  const navigate= useNavigate()

  const { data, isLoading, isError } = useQuery("searchList", async () => {
    const response = await axios.get(
      "https://codeforces.com/api/problemset.problems"
    );
    return response.data.result.problems;
  });

  useEffect(() => {
    if (isError) {
      navigate('/not-found');
    }
  }, [isError])

  const listRef = useRef(null);

  // Update popupList on every keydown
  useEffect(() => {
    if (searchValue === "" || isLoading) {
      setpopupList([]);
      return;
    }
    let findRegex = "";
    for (const c of searchValue) {
      findRegex += ".*" + c;
    }
    const searchRegex = new RegExp(findRegex, "i");
    let result = data?.filter((e) => searchRegex.test(e.name));
    if (result.length > 100) result = result.slice(0, 100);
    setpopupList([...result]);
  }, [searchValue]);

  // Scroll Down when adding problems
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [problemList]);
  
  return (
    <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-black/25 flex justify-center items-center"
    >
      <div
        className="z-40 absolute flex flex-col w-[350px] p-3 h-96 bg-white rounded-lg shadow-2xl sm:w-[500px]"
        onClick={() => setpopupList([])}
      >
        <X
          className="absolute right-3"
          onClick={() => {
            setIsModal("");
          }}
        />
        <div className="flex items-center font-bold text-2xl text-gray-700">
          <GiArchiveResearch />
          <span className="mx-1">Add Problems</span>
        </div>
        <div className="relative flex items-center justify-around w-2/3 sm:w-1/2 self-center my-4 p-1 border-[1px] bg-gray-50 rounded-md">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="focus:outline-none bg-gray-50 text-sm"
          />
          <BiSearch size={20} color="gray" />
          {popupList.length != 0 && (
            <div className="absolute z-20 top-8 w-full h-48 bg-gray-50 shadow-2xl overflow-y-auto">
              {popupList.map((e, i) =>
                row(i, e.name, e.index, e.contestId, e.rating, true)
              )}
            </div>
          )}
        </div>

        {/* List Navbar */}
        <div className="bg-gray-100 px-2 py-1 flex text-sm bg-black-gradient text-white rounded-sm">
          <div className="w-2/3">Problem</div>
          <div className="w-1/6">ContestID</div>
          <div className="w-1/6">Rating</div>
        </div>
        {problemList.length == 0 && (
          <div className="text-center text-gray-500 text-sm m-3">
            {isError
              ? "Internal Server Error ! Retry Later."
              : "Add some problems to this collection"}
          </div>
        )}
        <div ref={listRef} className="flex-grow overflow-y-auto">
          {problemList.map((e, i) =>
            row(i, e.name, e.index, e.contestId, e.rating, false)
          )}
        </div>

        <div className="flex items-center justify-end">
          {isIssue && !problemList.length ? (
            <div className="text-xs text-red-600 mr-3 mt-3">
              Add atleast one problem
            </div>
          ) : (
            ""
          )}
          <button
            className="btn-orange w-min mt-4"
            onClick={() => {
              if (!problemList.length) {
                setIssue(true);
                return;
              }
              setList((prev) => [...prev, [...problemList]]);
              setIsModal("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  function row(key, problemName, index, contestId, rating, ispopup) {
    return (
      <div
        key={key}
        data-tag={key}
        className="relative my-1 mr-4 px-2 py-1 flex items-center text-sm shadow-sm cursor-pointer"
        onClick={(e) => {
          if (ispopup) {
            const val = e.currentTarget.getAttribute("data-tag");
            const obj = popupList[val];

            const isAlreadyPresent = problemList?.find(
              (e) =>
                e.name === obj.name &&
                e.contestId === obj.contestId &&
                e.index === obj.index
            );

            if (isAlreadyPresent) return;
            setProblemList((prev) => [...prev, obj]);
          }
        }}
      >
        <div className="w-2/3 overflow-hidden">{`${index}. ${problemName}`}</div>
        {!ispopup ? (
          <div className="w-1/6">{contestId}</div>
        ) : (
          <div className="mr-2 text-gray-400 text-xs">//Rating</div>
        )}
        <div className="w-1/6">
          <div
            className="w-min rounded-2xl px-2 py-1"
            style={{
              color: rating >= 1600 ? "red" : rating >= 1400 ? "blue" : "green",
              backgroundColor:
                rating >= 1600
                  ? "rgb(254 226 226)"
                  : rating >= 1400
                  ? "rgb(191 219 254)"
                  : "rgb(187 247 208)",
            }}
          >
            {rating ? rating : "-"}
          </div>
        </div>
        {!ispopup && <Delete size={20} className="absolute right-0" onClick={() => {
          const list = problemList.filter((e, i) => i != key);
          setProblemList([...list]);
        }}/>}
      </div>
    );
  }
}

export default ProblemModal;
