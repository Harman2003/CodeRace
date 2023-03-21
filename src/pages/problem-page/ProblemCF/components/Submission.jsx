import React from "react";
import { useQuery } from "react-query";
import axios from "../../../../setup/api/axios";
import { RiArrowRightSLine as Arrow } from "react-icons/ri";
import useAuth from "../../../../setup/hooks/useAuth";
import useProblemData from "../../context/useProblemData";
import useAxiosPrivate from '../../../../setup/hooks/useAxiosPrivate';
import { useLocation, useNavigate } from "react-router-dom";

const Submission = ({ id }) => {

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const location= useLocation()
  const { setCode } = useProblemData()
  const { auth } = useAuth();
  const username = auth.user;
  const { data, isLoading } = useQuery("getSubmission", apiCall, {
    onError: (err) => {
      if (err.response.status === 403) {
        navigate('/login', {
          state:{from:location}
        })
       }
    }
  })

  return (
    <div className="h-full bg-white">
      {isLoading && <div>Loading ...</div>}
      {!isLoading &&
        data.map((e, i) => singleSubmission(i, e.createdAt, e.verdict, e.lang, e.id))}
    </div>
  );

  function singleSubmission(key, time, verdict, lang, submissionId) {
    const date = new Date(time * 1000);
    const day = date.toLocaleDateString();
    const Verdict = verdict === 'OK' ? 'Accepted' : 'Wrong Answer'
    return (
      <div onClick={() => handleClick(submissionId)}
        key={key}
        className="h-16 flex items-center cursor-pointer hover:bg-gray-50"
      >
        <div className="ml-6 w-32">
          <div
            className="font-[500]"
            style={{ color: verdict === "OK" ? "green" : "red" }}
          >
            {Verdict}
          </div>
          <div className="text-xs">{day}</div>
        </div>
        <div
          className="rounded-full px-3 text-sm ml-6"
          style={{
            color: verdict === "OK" ? "green" : "red",
            backgroundColor:
              verdict === "OK" ? "rgb(220 252 231)" : "rgb(254 226 226)",
          }}
        >
          {lang}
        </div>
        <div className="ml-auto mx-2">
          <Arrow size={30} color="lightgrey" />
        </div>
      </div>
    );
  }

  async function apiCall() {
    console.log(id)
    console.log(username);
    const response = await axiosPrivate.get(`/api/submit`, {params:{id:id, username:username}});
    // handle forbidden case , incase someone uses wrong localstorage username, then redirect to login

    return response.data.result;
  }

  async function handleClick(submissionId) {
    console.log(submissionId)
    const response = await axios.get(`/api/submit/${submissionId}`);
    console.log(response.data);
    setCode(response.data);
    return response.data;
  }
  
}

export default Submission;
