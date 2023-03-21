import React from "react";
import { FcGraduationCap as Cap } from "react-icons/fc";
import { HiOutlineMail as Mail } from "react-icons/hi";
import { FiEdit as Edit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "./modal";
import { useState } from "react";
import useAuth from "../../../setup/hooks/useAuth";

const Details = ({ setUserData, userData }) => {
  const [isModal, setIsModal] = useState(false);
  const { institute, bio, email, showEmail, username } = userData;
  const {auth}= useAuth()
  return (
    <>
      <div className=" mb-4 p-4 bg-white rounded-md shadow-sm font-poppins">
        <div className="flex mb-4 text-gray-500 text-sm">
          <div>Personal Details</div>
          {auth.user===username &&
          <div
            className="cursor-pointer hover:scale-105 ml-auto flex"
            onClick={() => setIsModal(!isModal)}
          >
            <Edit className="mr-1" />
            <div>Edit Profile</div>
          </div>}
        </div>
        <div className="flex items-center mb-2 font-poppins overflow-scroll">
          <Cap className="mr-2 text-5xl sm:text-2xl" />
          <div>{institute}</div>
        </div>
        <div className="flex items-center mb-2 font-poppins">
          <Mail size={25} className="mr-2" />

          <Link to="mailto:singhharmandhindsa@gmail.com">{email}</Link>
        </div>
        {bio && (
          <>
            <div className="mt-3 mb-1 text-gray-500 text-sm">Bio</div>
            <div className="font-poppins">{bio}</div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {isModal && auth.user===username && (
        <Modal
          userData={userData}
          setIsModal={setIsModal}
          setUserData={setUserData}
        />
      )}
    </>
  );
};

export default Details;
