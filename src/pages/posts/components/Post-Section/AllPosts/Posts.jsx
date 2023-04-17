import React, { useState, useEffect } from "react";
import CreatePost from "../../createPost/CreatePost";
import SinglePost from "../SinglePost/SinglePost";
import useAuth from "../../../../../setup/hooks/useAuth";
import useGetCall from "../../../../../setup/hooks/useGetCall";
import Select from "react-select";
import { Facebook } from "react-content-loader";
import usePagination from "../../../../../setup/hooks/usePagination";

const Posts = () => {
  const { auth } = useAuth();
  const [postData, setpostData] = useState([]);
  const [postState, setPostState] = useState("all");
  const [page, setPage] = useState(1);
  const [oldpage, setoldPage] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [order, setOrder] = useState({ value: "newest", label: "NewestFirst" });
  const options = [
    { value: "newest", label: "NewestFirst" },
    { value: "popular", label: "Popular" },
    { value: "trending", label: "Trending" },
    { value: "oldest", label: "Oldest First" },
  ];

  const [response, call, isLoading, status] = useGetCall({
    url: "/api/post",
    query: {
      params: {
        username: auth.user,
        action: postState,
        sort: order.value,
        page: page,
        
      },
    },
  });

  const [lastElementRef]= usePagination(isLoading, setPage, hasMore)

  useEffect(() => {
    if (!isLoading && response?.data) {
      console.log(console.log(response.data));
      setpostData([...response.data]);
    }
  }, [response]);

  useEffect(() => {
    setpostData([])
  }, [order.value, postState])

  const navClass =
    "mr-4 text-gray-700 text-[17px] hover:border-b-2 border-purple-700 hover:text-purple-700 cursor-pointer";
  return (
    <div className="px-3 md:px-10 md:w-[75%]">
      <CreatePost setpostData={setpostData} />
      <div className="flex-grow mt-10">
        <div className="flex">
          <div
            className={navClass}
            onClick={allPosts}
            style={
              postState === "all"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            All Posts
          </div>
          <div
            className={navClass}
            onClick={allFavourites}
            style={
              postState === "saved"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            Favourites
          </div>
          <div
            className={navClass}
            onClick={allLiked}
            style={
              postState === "liked"
                ? { borderBottomWidth: "2px", color: "rgb(126,34,206)" }
                : {}
            }
          >
            Liked Posts
          </div>
        </div>
        <hr />

        <div className="my-3">
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
            className="w-44 ml-auto text-gray-500 font-thin rounded-full react-select-"
            isSearchable={false}
          />
        </div>
        <hr />

        {isLoading ? (
          <div className="mt-5">
            <Facebook />
            <Facebook />
          </div>
        ) : (
          postData?.map((post, i) => (
            <SinglePost post={post} key={post._id} />
          ))
        )}
      </div>
    </div>
  );

  function allPosts() {
    setPostState('all')
  }
  function allFavourites() {
    setPostState('saved')
  }
  function allLiked() {
    setPostState('liked')
  }
}

export default Posts;
