import { useState } from "react";
import { useMutation } from "react-query";
import useAuth from "../../setup/hooks/useAuth";
import axios from "../../setup/api/axios";

export const useLogin = () => {
  // Global Auth Context
  const {setAuth} = useAuth();

  const apiCall = async (data) => {
    const response = await axios.post(
      "/login",
      {
        nameOrmail: data.username,
        password: data.password,
      },
      {
        headers:{'Content-Type': 'application/json'},
        withCredentials: true,
      }
    )
    return response;
  }

  const [status, setStatus] = useState(0);
  const { mutate, isLoading } = useMutation(apiCall, {
    onSuccess: (response) => {
      const accessToken = response.data?.accessToken;
      const user = response.data?.username;
      setAuth({ user, accessToken });
      setStatus(response.status);
      //Store details in localstorage
      localStorage.setItem("auth", JSON.stringify({ user, accessToken }));
    },
    onError: (err) => {
      if (!err?.response) {
        setStatus(500);
      } else setStatus(err.response.status);
    }
  })

  return [status, isLoading, (data) => mutate(data)]
}
