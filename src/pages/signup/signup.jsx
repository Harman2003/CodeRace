import React, { useState } from "react";
import Input from "./inputbox";
import Button from "./Submit";
const Signup = ({ isLogin, setLogin }) => {
  const [User, setUser] = useState({
    "Full Name": "",
    Username: "",
    "E-mail Address": "",
    Password: "",
    "Confirm Password": "",
  });
  const [isEmpty, setEmpty] = useState(false);

  return (
    <div className="h-[calc(100vh-40px)] pt-1 bg-gray-200">
      <div className="w-96 h-full mx-auto rounded-md py-20 bg-white">
        <div className="mx-10 h-full flex flex-col items-center">
          <div className="text-4xl font-bold">CodeRace</div>

          <div className="flex flex-col justify-evenly w-full h-[70%] text-sm">
           
            <Input placeholder="Full Name" State={{ User, setUser, isEmpty }} />
            <Input placeholder="Username" State={{ User, setUser, isEmpty }} />
            <Input
              placeholder="E-mail Address"
              State={{ User, setUser, isEmpty }}
            />
            <Input placeholder="Password" State={{ User, setUser, isEmpty }} />
            <Input
              placeholder="Confirm Password"
              State={{ User, setUser, isEmpty }}
            />
              <Button States={{ User, setEmpty }} />
            
          </div>

          <div>
            Have an account?{" "}
            <span
              onClick={() => setLogin(!isLogin)}
              className="cursor-pointer text-blue-800"
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
