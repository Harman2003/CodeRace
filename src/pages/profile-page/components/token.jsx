import React from "react";
import { MdGeneratingTokens as Coin } from "react-icons/md";
import { TbMilitaryRank as Level } from "react-icons/tb";
import {FaHandsHelping as Help} from 'react-icons/fa'


const Token = ({userData}) => {
  return (
    <div className="h-52 flex-1 md:ml-4 mb-4 p-4 bg-white rounded-md shadow-sm font-poppins">
      <div className="mb-4 text-gray-500 text-sm">Level</div>
      <div className="flex items-center">
        <div>
          {IconText(Coin, "Tokens", userData.tokens, "gold", "gray")}
          {IconText(Level, "Level", "Master", "black", "orange")}
          {IconText(Help, "Contribution", 0, "black", "green")}
        </div>
        <img src="../images/token.png" alt="token" className="ml-auto w-16" />
      </div>
    </div>
  );
};

function IconText(Icon, text, value, color, levelcolor) {
  return (
    <div className="flex items-center mx-3 my-2 text-lg font-bold">
      <Icon size={28} color={color} />
      <div className="ml-1 flex">
        {text}:<div className={`ml-1 text-${levelcolor}-600`}>{value}</div>
      </div>
    </div>
  );
}

export default Token;
