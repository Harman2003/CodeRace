import React from "react";
import Main from "./components/main";
import Solved from "./components/solved";
import History from "./components/history";
import Token from "./components/token";
import Skills from "./components/skills";
import Details from "./components/details";
import { useState } from "react";
import useAuth from "../../setup/hooks/useAuth";
import { useLayoutEffect } from "react";
import axios from "../../setup/api/axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { auth } = useAuth()
  const {id}= useParams()
  const [userData, setUserData] = useState({
    username: auth.user,
    fullname: auth.user,
    skills: [],
    bio: '',
    institute: 'CodeRace Academy',
    email:'',
    showEmail: false,
    github: '',
    linkedIn:'',
    rating: 0,
    easy: 100,
    medium: 0,
    hard: 0,
    followers: 0,
    following: 0,
    tokens: 0,
  });

  const [loading, setLoading] = useState(true);


  useLayoutEffect(() => {
    axios.get(`/profile`, {
      params: {
      username: id
    }})
      .then((res) => {
        const newData = res.data.UserData;
        console.log(newData)
        setUserData({ ...newData });
        setLoading(false);
      })
      .catch(err=>{
      console.log(err)
    })
  }, [])
  
  if (loading) {
    return <div></div>
  }

  return (
    <div className=" h-[calc(100%-40px)] p-6 xl:flex  xl:flex-row bg-gray-100">
      <div className="w-[100%] xl:w-[75%] mr-4">
        <Main userData={userData} />
        <Details userData={userData} setUserData={setUserData} />
        <div className="md:flex">
          <Solved userData={userData} />
          <Token userData={userData} />
          <Skills userData={userData} />
        </div>
      </div>
      <div className="xl:grow">
        <History />
      </div>
    </div>
  );
}

export default Profile;
