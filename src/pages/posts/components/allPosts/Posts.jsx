import React from "react";
import SinglePost from "./SinglePost";
import { useQuery } from "react-query";
import axios from "../../../../setup/api/axios";

const Posts = ({ postData, setpostData }) => {
  // console.log(postData);
  const { isLoading } = useQuery(
    "getPosts",
    async () => {
      const response = await axios.get("/api/post");
      return response.data;
    },
    {
      onSuccess: (data) => setpostData(data),
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-grow rounded-lg">
      {postData?.map((post, i) => <SinglePost post={post} key={i}/>)}
    </div>
  )
}

export default Posts;
