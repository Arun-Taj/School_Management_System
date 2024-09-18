import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const StudentResult = () => {
  const navigate = useNavigate();

  const handleResultClick = () => {
    navigate("/exam/studentResult"); // Navigate to the edit page
  };
  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700">Student Wise Result</span>
        </div>
      </div>

      <div className="felx flex-col ">
        <h1 className="text-center font-bold text-xl pt-10">
          Student Wise Result (Single)
        </h1>
        <div className="flex flex-row justify-center pt-8 gap-4">
          <span className=" text-center ">
            <p className="text-center font-bold">Select Session</p>
            <select
              name=""
              id=""
              className="p-2 bg-white rounded-full border border-gray-300 w-40 "
            >
              <option value="">2020-2021</option>
              <option value="">2021-2022</option>
              <option value="">2022-2023</option>
              <option value="">2023-2024</option>
            </select>
          </span>
          <span className=" text-center ">
            <p className="text-center font-bold">Select Exam</p>
            <select
              name=""
              id=""
              className="p-2 bg-white rounded-full border border-gray-300 w-80 "
            >
              <option value="" selected disabled></option>
              <option value="">CBSE</option>
              <option value="">NEB</option>
              <option value="">SEE</option>
              <option value="">DLE</option>
            </select>
          </span>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center py-10  ">
          <div className="w-96 ">
            <div className="flex items-center  bg-white rounded-full ">
              {/* Left Side: Three-Line Menu Icon */}
              <IoFilterSharp className="text-gray-600 ml-4 cursor-pointer" size={24} />

              {/* Vertical Line Divider */}
              <div className="w-px h-6 bg-gray-600 mx-4"></div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search"
                className="flex-grow px-4 py-2 text-black placeholder-gray-500 bg-transparent focus:outline-none items-center text-center"
              />

              {/* Right Side: Search Icon */}
              <IoSearch className="text-gray-600 mr-4 cursor-pointer" size={24} onClick={handleResultClick}/>
            </div>
          </div>
          {/* <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
            <FiRefreshCcw />
          </div> */}
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <button type="button" className="bg-pink-500  p-2 px-8 rounded-full text-white" onClick={handleResultClick}>Search</button>
      </div>
    </div>
  );
};

export default StudentResult;
