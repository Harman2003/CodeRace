import React from "react";
import { useState } from "react";
import useGetCall from "../../../../setup/hooks/useGetCall";
import useAuth from "../../../../setup/hooks/useAuth";
import { useEffect } from "react";
import getActive from "../../util/getActive";
import getRegistered from "../../util/getRegistered";

const People = () => {
  const { auth } = useAuth();
  const [memberList, setMemberList] = useState([]);
  const [order, setOrder] = useState("Newest");
  const [response, call, isLoading, status] = useGetCall({
    url: "api/members",
    query: {
      params: {
        username: auth.user,
        action: "all",
        sort: order,
        limit: 6,
      },
    },
  });

  if (memberList.length==0) {
    <div className="text-lg text-gray-500 h-16 mb-6 shadow rounded-lg flex items-center justify-center border-t-2 border-purple-700">
      <Error size={23} className="text-purple-700 mx-2" />
      <div>Sorry, No members were found</div>
    </div>;
  }

  useEffect(() => {
    if (!isLoading && response?.data) {
      console.log(order);
      const newList = response.data.memberList;
      setMemberList([...newList]);
    }
  }, [response]);

  useEffect(() => {
    setMemberList([]);
  }, [order]);

  return (
    <div className="bg-slate-100 h-[422px] p-[32px] rounded-md">
      <div className="max-w-fit border-b-2 mb-2 border-purple-700 font-semibold text-gray-600">
        Member
      </div>
      <div className="text-gray-600 text-sm mb-4">
        <span
          className="hover:text-purple-700 hover:border-b-[1px] hover:border-purple-700 cursor-pointer"
          onClick={() => setOrder("Newest")}
        >
          Newest
        </span>{" "}
        |{" "}
        <span
          className="hover:text-purple-700 hover:border-b-[1px] hover:border-purple-700 cursor-pointer"
          onClick={() => setOrder("Last Active")}
        >
          Active
        </span>{" "}
        |{" "}
        <span
          className="hover:text-purple-700 hover:border-b-[1px] hover:border-purple-700 cursor-pointer"
          onClick={() => setOrder("Popular")}
        >
          Popular
        </span>
      </div>
      {memberList.map((e, i) =>
        memberItem(i, e.username, e.active, e.followerCount, e.newest)
      )}
    </div>
  );

  function memberItem(index, username, active, followerCount, newest) {
    const feature =
      order === "Newest"
        ? getRegistered(newest)
        : order === "Last Active"
        ? getActive(active)
        : followerCount + " followers";

    return (
      <div key={index} className="flex items-center my-2">
        <img
          className="min-w-[40px] w-10 h-10 rounded-full self-center"
          src="/images/user.png"
          alt="user logo"
        />
        <div className="ml-4">
          <div>{username}</div>
          <div className="text-xs text-gray-500">{feature}</div>
        </div>
      </div>
    );
  }
};

export default People;
