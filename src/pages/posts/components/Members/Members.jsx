import React, { useState, useEffect} from "react";

import Select from "react-select";
import MemberList from "./MemberList";
import useGetCall from "../../../../setup/hooks/useGetCall";
import useAuth from "../../../../setup/hooks/useAuth";
import usePagination from "../../../../setup/hooks/usePagination";

const Members = ({ state }) => {
  const { auth } = useAuth();
  const [memberList, setMemberList] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [memberState, setMemberState] = useState(state || "all");
  const [page, setPage] = useState(1);
  const [oldpage, setoldPage] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [order, setOrder] = useState({ value: "popular", label: "Popular" });
  const options = [
    { value: "popular", label: "Popular" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "lastActive", label: "Last Active" },
  ];
  

  // Api Query
  const [response, call, isLoading, status] = useGetCall({
    url: "api/members",
    query: {
      params: {
        username: auth.user,
        action: memberState,
        sort: order.label,
        search: searchQuery,
        page: page,
        limit: 10,
      },
    },
  });

  const [lastElementRef] = usePagination(isLoading, setPage, hasMore);

  useEffect(() => {
    setMemberList([]);
    setPage(1);
    setoldPage(-1);
  }, [order.label, searchQuery, memberState]);

  useEffect(() => {
    console.log(page, oldpage);
    if (!isLoading && response?.data) {  
        if (page > 1) {
          // console.log("old", oldpage);
           setoldPage(page);
        }
        setHasMore(response.data.memberList.length > 0);
       
        if(page!==oldpage){
        const newList = response.data.memberList;
          setMemberList((prev) => [...new Set([...prev, ...newList])]);
      }
    }
  }, [response]);

  return (
    <div className="flex flex-col pt-12 px-3 md:px-16 md:w-[70%]">
      <div>
        <div className="flex">
          <div
            className="mr-6 hover:border-b-2 hover:text-purple-700 border-purple-700 pb-2 cursor-pointer"
            onClick={allMembers}
            style={
              memberState === "all"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            All Members
          </div>
          <div
            className="mr-6 hover:border-b-2 hover:text-purple-700 border-purple-700 pb-2 cursor-pointer"
            onClick={myfollowers}
            style={
              memberState === "followers"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            My Followers
          </div>
          <div
            className="mr-6 hover:border-b-2 hover:text-purple-700 border-purple-700 pb-2 cursor-pointer"
            onClick={myfollowing}
            style={
              memberState === "following"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            My Following
          </div>
        </div>
        <hr className="mb-2" />
      </div>

      {/* Search & Sort */}
      <div className="flex">
        <div className="flex">
          <input
            value={searchQuery}
            onChange={handleSearchQuery}
            type="text"
            placeholder="Search Members..."
            className="h-10 border-[1px] rounded-full focus:outline-none
            focus:border-gray-400 placeholder:font-thin px-4 py-1"
          />
      
        </div>
        <Select
          value={order}
          onChange={(option) => setOrder(option)}
          options={options}
          styles={{
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "gray",
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "9999px",
              borderColor: state.isFocused ? "purple" : "",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }),
            option: (base) => ({
              ...base,
              height: "32px",
            }),
          }}
          className="ml-auto text-gray-500 font-thin rounded-full react-select-"
          isSearchable={false}
        />
      </div>
      <hr className="my-6" />

      <MemberList list={memberList} ref={lastElementRef} hasMore={hasMore} isLoading={isLoading} />
    </div>
  );

  async function allMembers() {
    setMemberState("all");
  }
  async function myfollowers() {
    setMemberState("followers");
  }
  async function myfollowing() {
    setMemberState("following");
  }
  async function handleSearchQuery(e) {
    setsearchQuery(e.target.value);
    setPage();
  }
};

export default Members;
