import React,{useEffect} from "react";
import Lottie from "lottie-react";
import statsAnimation from "../../../assets/stats-lottie.json";
import useAuth from "../../../setup/hooks/useAuth";
import { HiTrendingUp as Up } from "react-icons/hi";
import { RxTriangleUp as Grow } from "react-icons/rx";
import { FaCrown as Crown } from "react-icons/fa";
import { useRef } from "react";

const Stats = () => {
  const { auth } = useAuth();
  const animationRef = useRef();
  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return
    console.log(animation)
    const play = () => {
      animation.play();
    };

     animation.setSpeed(0.6)
   
   }, []);
  return (
    <div className="w-[25%] h-full ml-auto mr-8 pt-4">
      <div className=" flex flex-col items-center bg-white rounded-lg overflow-hidden">
        <div className="self-start mx-3 my-2 text-lg font-semibold">
          Profile
        </div>
        <div className="flex items-center">
          <div className="border-[3px] border-orange-500 shadow-lg rounded-full my-3">
            <img
              className="min-w-[96px] w-24 h-24 rounded-full overflow-hidden m-0.5"
              src="/images/user.png"
              alt="user logo"
            />
          </div>
          <div className="relative ml-4">
            <Crown size={30} className="absolute right-0 translate-x-7 -translate-y-4 text-yellow-500 rotate-45"/>
            <div className="text-2xl font-roboto">@{auth.user}</div>
            <div className="text-sm text-gray-500">Rating- 1500</div>
            <div className="text-sm text-gray-500">Level- Master</div>
          </div>
        </div>

        <div className="purple-gradient h-20 w-[92%] rounded-lg shadow-md mx-2 my-3 flex justify-evenly items-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-poppins  font-semibold">10</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-poppins  font-semibold">362</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-poppins  font-semibold">362</div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
        </div>

        <div className="w-full flex">
          <div
            className="flex relative w-1/2 ml-4 mb-8 rounded-lg shadow-md bg-gray-100"
            style={{ backgroundImage: "url(images/button-bg.png)" }}
          >
            <div className=" mx-auto self-center flex items-center">
              <Up size={70} className="text-green-600" />
              <div className="ml-1 flex flex-col items-center">
                <div className="text-4xl font-poppins font-semibold text-gray-700">140</div>
                <div className="text-sm text-gray-500">Upvotes</div>
              </div>
              <div className="flex items-center absolute top-2 left-1 self-start text-green-500 cursor-pointer" title="Last 7 days">
                <Grow size={20} />
                <div className="text-xs">5%</div>
              </div>
            </div>
          </div>
          <Lottie
            animationData={statsAnimation}
            loop={true}
            className=" w-[50%]"
            lottieRef={animationRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Stats;
