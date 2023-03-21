import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { register } from "./registerApi";
import { useLogin } from "../sign-in/loginApi";
import useAuth from "../../setup/hooks/useAuth";

const Button = ({ States }) => {
  const {auth}= useAuth()
  const { User, setEmpty } = States;
  const [passMatch, setpass] = useState(false);
  const [status, setStatus] = useState(-1);
  const navigate = useNavigate();
  const [loginStatus, loginLoading, login]= useLogin()

  const {mutate, isLoading}= useMutation(register, {
    onSuccess: data => {
      login({username:User['Username'].trim(),password:User['Password'].trim()});
      setStatus(data);
    },
    onError: err => {
      console.log(err);
      setStatus(err.response.status);
    }
} )

  const signup = async () => {
    if (
      User["Full Name"].trim() === "" ||
      User["Username"].trim() === "" ||
      User["E-mail Address"].trim() === "" ||
      User["Password"].trim() === "" ||
      User["Confirm Password"].trim() === ""
    ) {
      setEmpty(true);
      return;
    }
    if (User["Password"] != User["Confirm Password"]) {
      setpass(true);
      setTimeout(() => {
        setpass(false);
      }, 3000);
      return;
    }

     mutate(User);
     
  };

  console.log(status)
  if (loginStatus == 200) {
    setTimeout(() => {
      navigate(`/profile/${auth.user}`);
    }, 2000);
  }

  return (
    <>
      <div>
        {passMatch && (
          <p className="text-xs text-red-600 text-center animate-fade">
            Password does not match !
          </p>
        )}
        {status == 409 && (
          <p className="text-xs text-red-600 text-center animate-fade">
            This Username has already been taken
          </p>
        )}
        {(status==500) && (
          <p className="text-xs text-red-600 text-center animate-fade">
            Internal Server Error
          </p>
        )}
      </div>
      <button type="submit"
        className="w-full h-11 bg-black text-white rounded-md place-items-center"
        onClick={signup}
        disabled={isLoading}
      >
        {isLoading || status==200 ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Sign Up"
        )}
      </button>
    </>
  );
};

export default Button;
