import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpdateMarks = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/exam/search"); // Navigate to the edit page
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
          <span className="text-gray-700 font-medium">
            Add/Update Exam Marks
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center pt-24">
        <span className=" text-center w-1/6">
          <p className="text-center font-bold">Select Session</p>
          <select
            name=""
            id=""
            className="p-2 bg-white rounded-full border border-gray-300 px-4 w-4/5"
          >
            <option value="">2020-2021</option>
            <option value="">2021-2022</option>
            <option value="">2022-2023</option>
            <option value="">2023-2024</option>
          </select>
        </span>
        <span className=" text-center w-2/4">
          <p className="text-center font-bold">Select Exam</p>
          <select
            name=""
            id=""
            className="p-2 bg-white rounded-full border border-gray-300 w-3/4 "
          >
            <option value="" selected disabled></option>
            <option value="">CBSE</option>
            <option value="">NEB</option>
            <option value="">SEE</option>
            <option value="">DLE</option>
          </select>
        </span>
      </div>
      <div className="flex flex-row gap-8 justify-center pt-24">
        <button
          type="button"
          className="bg-pink-500  p-2 px-8 rounded-full text-white"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UpdateMarks;
