import useAxiosPrivate from "./useAxiosPrivate";
import { useMutation } from "react-query";
import { useState } from "react";
import useAuth from "./useAuth";

const useSubmit = () => {
  const axiosPrivate= useAxiosPrivate()
  const { auth } = useAuth();
  const [status, setStatus] = useState();
  const { mutate, isLoading } = useMutation(apiCall, {
    onSuccess: (res) => {
      setStatus(res.status);
    },
    onError: (err) => {
      if (!err?.response) {
        setStatus(500);
      } else setStatus(err.response?.status);
    },
  });

  return [
    (url, obj)=>mutate({url:url, obj:obj}),
    isLoading,
    status,
    setStatus
  ];

  // post section ab handle kr lena maine profile edit ke liye changes kre
  
  async function apiCall({ url, obj }) {
      const response = await axiosPrivate.post(url, obj.body, obj.query)
      return response;
  }
}
export default useSubmit;
