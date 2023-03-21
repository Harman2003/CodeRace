import { useMutation } from "react-query";
import { useState } from "react";
import useAxiosPrivate from "../../../setup/hooks/useAxiosPrivate";

const useSubmit = () => {
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState();
  const [data, setdata] = useState();
  const { mutate, isLoading } = useMutation(apiCall, {
    onSuccess: (res) => {
      setStatus(res.status);
      setdata(res.data);
    },
    onError: (err) => {
      if (!err?.response) {
        setStatus(500);
      } else setStatus(err.response.status);
    }
  })
  
  return [
    (id, code, lang, username) => mutate({ id, code, lang, username }),
    isLoading,
    status,
    data,
  ];

  async function apiCall({ id, code, lang, username }) {
    const response = await axiosPrivate.post(
      "/api/submit",
      { code: code, lang: lang }, {
      params: {
        id: id,
        username: username
      }
    }
    )
    return response;
  }
}
export default useSubmit;

