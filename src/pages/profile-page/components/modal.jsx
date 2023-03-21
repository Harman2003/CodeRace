import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { RxCross1 as X } from "react-icons/rx";
import { GoIssueOpened as Issue } from "react-icons/go";
import Colleges from "../../../assets/colleges.json";
import Select from "react-select";
import Switch from "react-switch";
import useAuth from "../../../setup/hooks/useAuth";
import { useEffect } from "react";
import useAxiosPrivate from "../../../setup/hooks/useAxiosPrivate";

const Modal = ({ userData, setUserData, setIsModal }) => {
  const { auth } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const [bioText, setBioText] = useState(userData.bio);
  const skillsRef = useRef();
  const [selectedInstitute, setSelectedInstitute] = useState({
    label: userData.institute,
    value: 0,
  });
  const [isEmailVisible, setIsEmail] = useState(userData.showEmail);
  const github = useRef();
  const linkedIn = useRef();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    nameRef.current.value = userData.fullname;
    emailRef.current.value = userData.email;
    skillsRef.current.value = userData.skills.join(", ");
    github.current.value = userData.github;
    linkedIn.current.value = userData.linkedIn;
  }, []);

  return (
    <div className="font-openSans fixed z-20 top-0 left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="absolute z-20 flex flex-col w-[350px]  h-[90%] sm:h-[95%] bg-white rounded-lg shadow-2xl sm:w-[500px]">
        <X
          className="absolute right-3 top-3"
          onClick={() => {
            setIsModal(false);
          }}
        />
        <div className="text-3xl font-bold mb-6 mt-3 ml-3">Edit Profile</div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className=" flex items-center mx-10 mb-4">
            <div className="w-[30%]">Full Name</div>
            <input
              ref={nameRef}
              type="text"
              className="w-[70%] border-[1px] rounded-lg px-1 py-2"
              placeholder="Eg: John Smith"
              required
            />
          </div>

          {/* Email */}
          <div className=" flex items-center mx-10 mb-10">
            <div className="w-[30%]"> Email</div>
            <div className="relative w-[70%]">
              <input
                ref={emailRef}
                type="email"
                className="w-full border-[1px] rounded-lg px-1 py-2"
                placeholder="Eg: abc@gmail.com"
                required
              />
              <div className="absolute -bottom-6 flex items-center text-[13px]">
                <span className="mr-2">visible to anyone</span>
                <Switch
                  checked={isEmailVisible}
                  onChange={handleChange}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  height={18}
                  width={40}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                />
              </div>
            </div>
          </div>

          {/* Institute */}
          <div className=" flex items-center mx-10 mb-4">
            <div className="w-[30%]">Institute</div>
            <Select
              value={selectedInstitute}
              className="w-[70%] rounded-lg px-1 py-2"
              onChange={setSelectedInstitute}
              options={Colleges}
              isSearchable
            />
          </div>

          {/* Skills */}
          <div className=" flex items-center mx-10 mb-4">
            <div className="w-[30%]">Skills</div>
            <input
              ref={skillsRef}
              type="text"
              className="w-[70%] border-[1px] rounded-lg px-1 py-2"
              placeholder="Eg: Problem Solving, Chess"
            />
          </div>

          {/* Bio */}
          <div className=" flex items-center mx-10 mb-6">
            <div className="w-[30%]">Bio</div>
            <div className="w-[70%]">
              <textarea
                type="text"
                value={bioText}
                className="w-full border-[1px] rounded-lg px-1 py-2 resize-none h-20"
                placeholder="Eg: Hey I'm a tech enthusiast. . ."
                onChange={handleBioChange}
              />
              <div className="flex items-center text-xs text-gray-500">
                <Issue size={15} />
                <div className="ml-0.5 text-xs text-gray-500">
                  {300 - bioText.length} characters remaining
                </div>
              </div>
            </div>
          </div>

          <div className=" flex items-center mx-10 mb-4 font-semibold">
            Social Profile
          </div>

          {/* LinkedIn */}
          <div className=" flex items-center mx-10 mb-4">
            <div className="w-[30%]">LinkedIn</div>
            <input
              ref={linkedIn}
              type="text"
              className="w-[70%] border-[1px] rounded-lg px-1 py-2"
              placeholder="Eg: https://www.linkedin.com/in/..."
            />
          </div>

          {/* Github */}
          <div className=" flex items-center mx-10 mb-4">
            <div className="w-[30%]">Github</div>
            <input
              ref={github}
              type="text"
              className="w-[70%] border-[1px] rounded-lg px-1 py-2"
              placeholder="Eg: https://github.com/john123"
            />
          </div>

          <div className="flex justify-end w-full h-14 rounded-b-md mt-auto bg-gray-200">
            <button
              type="submit"
              className="mx-4 my-2 px-2 rounded-lg bg-orange-gradient text-gray-100 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  async function handleSubmit(event) {
    const fullname = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    event.preventDefault();
    const skills = skillsRef.current.value.split(",");
    console.log(skills);
    const curatedSkills = skills.filter((e) => e.trim());

    const newData = {
      fullname: fullname,
      email: email,
      showEmail: isEmailVisible,
      institute: selectedInstitute.label,
      bio: bioText,
      skills: curatedSkills.map((e) => e.trim()),
      linkedIn: linkedIn.current.value,
      github: github.current.value,
    };

    // await submit(`/profile`, { body: { UserObj: newData }, query: { params: { username: auth.user } } });
    await axiosPrivate.post(
      `/profile`,
      { UserObj: newData },
      { params: { username: auth.user } }
    )
    setUserData((prev) => {
      return {
        ...prev,
        ...newData,
      };
    });
    setIsModal(false);
  }

  function handleChange(nextChecked) {
    setIsEmail(nextChecked);
  }

  function handleBioChange(e) {
    if (e.target.value.length > 300) return;
    setBioText(e.target.value);
  }
};

export default Modal;
