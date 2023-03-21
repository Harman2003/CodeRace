import React, { useRef, useState } from 'react'
import Button from './Submit';

const Login = ({ isLogin, setLogin }) => {
  const [isSpace, setSpace] = useState(-1);
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <div className="h-[calc(100vh-40px)] pt-1 bg-gray-200 flex">
        <div className="w-96 h-2/3 m-auto rounded-md py-20 bg-white">
          <div className="mx-10 h-full flex flex-col items-center">
            <div className="text-4xl font-bold">CodeRace</div>

            <div className="flex flex-col justify-evenly w-full h-[70%] text-sm">
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username or E-mail Address"
                onChange={handleChange}
                className="w-full h-11 border-[1px] rounded-sm p-2"
              />
              {(isSpace == 0 || isSpace == 2) && (
                <div className="text-xs text-red-600">
                  Username/E-mail cannot contain whitespaces
                </div>
              )}
              <input
                ref={passwordRef}
                type="text"
                placeholder="Password"
                onChange={handleChange}
                className="w-full h-11 border-[1px] rounded-sm p-2"
              />
              {(isSpace == 1 || isSpace == 2) && (
                <div className="text-xs text-red-600">
                  Password cannot contain whitespaces
                </div>
              )}
              <Button usernameRef={usernameRef} passwordRef={passwordRef} isSpace={isSpace} />
            </div>

            <div>
              New Here?{" "}
              <span
                onClick={() => setLogin(!isLogin)}
                className="cursor-pointer text-blue-800"
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  function handleChange(e) {
    if (
      usernameRef.current.value.trim().includes(" ") &&
      passwordRef.current.value.trim().includes(" ")
    )
    {
      setSpace(2);
    }
   else if (passwordRef.current.value.trim().includes(" ")) setSpace(1);

    else if (usernameRef.current.value.trim().includes(" ")) setSpace(0);
    else setSpace(-1);
  }
}

export default Login
