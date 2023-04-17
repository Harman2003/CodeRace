import React, { useEffect, useState } from "react";
import { RxDoubleArrowLeft as LeftArrow } from "react-icons/rx";
import { RxDoubleArrowRight as RightArrow } from "react-icons/rx";
import { useQuery } from "react-query";
import Singlerow from "./components/singlerow";
import Navbar from "./components/navbar";
import { fetchData } from "./api/problemset";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [page, setpage] = useState(0);
  const navigate= useNavigate()

  const { data, isLoading , isError} = useQuery(["problemset"], fetchData, {
    cacheTime: 360000
  });
  
  let problemset;
  let maxPage;
  if (!isLoading && !isError) {
    const problemList = data?.data.result.problems;
    const uniqueArray = Array.from(
      new Set(problemList?.map((obj) => JSON.stringify(obj)))
    ).map((str) => JSON.parse(str));
    maxPage = Math.floor(uniqueArray.length / 100+1);
    problemset = uniqueArray.slice(100 * page, 100 * (page + 1));
  }

  useEffect(() => {
    if (isError) {
      navigate('../not-found')
    }
  }, [isError]);
  return (
    <>
      <div className="relative text-sm flex-grow overflow-scroll">
        <Navbar />
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && (
          <div>
            {problemset?.map((e,i) => {
              return (
                <Singlerow
                  key={e.name+i}
                  name={e.name}
                  contestId={e.contestId}
                  index={e.index}
                  tag={e.tags}
                  rating={e.rating}
                  color={i}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Prev-Next Arrows */}
      {!isLoading && (
        <div className="flex self-end items-center mt-2">
          <div
            onClick={() => {
              if (page != 0) setpage(page - 1);
            }}
          >
            {page != 0 && <LeftArrow size={20} />}
          </div>
          <div className="text-xs text-gray-500"> {page + 1}/{maxPage+1}</div>
          <div
            onClick={() => {
              if (page != maxPage) setpage(page + 1);
            }}
          >
            {page != maxPage && <RightArrow size={20} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
