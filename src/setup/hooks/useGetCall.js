import useAxiosPrivate from "./useAxiosPrivate";
import { useQuery } from "react-query";
import { useState } from "react";

const useGetCall = (params) => {
  const axiosPrivate = useAxiosPrivate();
  const {data, refetch, isLoading, status } = useQuery(['useGetCall', params], ({signal})=>apiCall(params, signal), {refetchOnWindowFocus:false,cacheTime:0})

    return [
      data,
      refetch,
    isLoading,
    status
  ];

  async function apiCall({ url, query }, signal) {
    console.log('came');
    try {   
      const response = await axiosPrivate.get(url, { ...query, signal });
      return response;
    }
    catch (err) {
      console.log(err);
    }
  }
};
export default useGetCall;
