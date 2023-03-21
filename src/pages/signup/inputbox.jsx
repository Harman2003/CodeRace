import React, { useState, useRef } from "react";

const Input = ({ placeholder, State }) => {
  const { User, setUser, isEmpty } = State;
  const specialChars = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;

  const [isError, setError] = useState(false);
  const inputRef = useRef(null);

  const setData = (e) => {
    let obj = User;
    obj[placeholder] = e.target.value;
    setUser({ ...obj });

    const value = e.target.value.trim();

    if (placeholder === "Username" && specialChars.test(value)) {
      setError(true);
    } else setError(false);
  };

  // class for text
  let styles =
    "w-full h-11 border-[1px] rounded-sm p-2 hover:border-black text-lg";
  
  // class for dots (password)
  if (placeholder === 'Password' || placeholder === 'Confirm Password') {
    styles =
      "w-full h-11 border-[1px] rounded-sm p-2 hover:border-black placeholder:text-[18px] text-[25px]";
  }
  
  return (
    <div>
      <input
        ref={inputRef}
        type={type(placeholder)}
        placeholder={placeholder}
        value={User[placeholder]}
        onChange={setData}
        className={styles}
      />
      {isError && (
        <div className="text-xs text-red-600">{ErrorText(placeholder)}</div>
      )}
      {isEmpty && inputRef.current?.value === "" && (
        <div className="text-xs text-red-600">
          {placeholder} can not be Empty
        </div>
      )}
    </div>
  );

  function ErrorText(value) {
    if (value === "Username")
      return `${value} can only contain letters, numbers, underscores and periods `;
  }

  function type(placeholder) {
    if (placeholder === "E-Mail Address") {
      return "email";
    } else if (
      placeholder === "Password" ||
      placeholder === "Confirm Password"
    ) {
      return "password";
    } else return "text";
  }
};

export default Input;
