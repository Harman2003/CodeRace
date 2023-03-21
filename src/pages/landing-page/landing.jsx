import React, { useState } from "react";
import Signup from "../signup/signup";
import Login from "../sign-in/login";

const Landing = ({current}) => {
  const [isLogin, setLogin] = useState(current);
  return (
    <>
      {isLogin ? 
        <Login isLogin={isLogin} setLogin={setLogin} />
       : 
        <Signup isLogin={isLogin} setLogin={setLogin} />
      }
    </>
  );
};

export default Landing;
