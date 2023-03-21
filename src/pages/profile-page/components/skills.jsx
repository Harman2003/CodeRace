import React, { useState, useEffect, useRef } from "react";

const Skills = ({userData}) => {
  const [Toggle, setToggle] = useState(false);
   const parentRef = useRef(null);
   const childRef = useRef(null);
   const [hasOverflow, setHasOverflow] = useState(false);

  console.log(hasOverflow)
   useEffect(() => {
     const parentElement = parentRef.current;
     const childElement = childRef.current;

     if (parentElement && childElement) {
       const hasOverflow =
         childElement.scrollHeight > parentElement.clientHeight-32;
       console.log(childElement.scrollHeight)
       console.log(parentElement.clientHeight-32)
        childElement.style.overflow= 'hidden'
       setHasOverflow(hasOverflow);
     }
   }, [userData]);


  return (
    <div
      ref={parentRef}
      className="h-52 flex-1 md:ml-4 mb-4 p-4 bg-white rounded-md shadow-sm font-poppins flex flex-col">
      <div className="mb-4 text-gray-500 text-sm">Skills</div>
      <div
        ref={childRef}
        className={"flex flex-wrap relative z-10 bg-white p-4 border-gray-100"
        }
      >
        {userData.skills.map((e, i) => <Tags value={e} key={i} />)}
        <div
          className="absolute bottom-2 right-0 text-xs text-gray-400 cursor-pointer"
          onClick={() => {
            childRef.current.style.overflow = "hidden";
            childRef.current.style.border = "0px";
            setToggle(!Toggle);
          }}>
          {Toggle && "view less"}
        </div>
      </div>
      <div
        className="ml-auto text-xs text-gray-400 cursor-pointer"
        onClick={() => {
          childRef.current.style.overflow = "visible";
          childRef.current.style.border = "1px solid rgb(237, 232, 232)";
          childRef.current.style.borderRadius = "5px";
          setToggle(!Toggle)
        }}
      >
        {!Toggle && hasOverflow && "view all"}
      </div>
    </div>
  );
};

const Tags = ({ value}) => {
  return (
    <div className="bg-gray-100 m-1 p-2 rounded-full text-xs">{value}</div>
  );
};

export default Skills;
