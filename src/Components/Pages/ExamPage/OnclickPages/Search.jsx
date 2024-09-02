import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Search = () => {
 const navigate=useNavigate();
 const AddWholeClsDataClick=()=>{
  navigate("/exam/search/addWholeClsData");
 }
 const AddSingleStdDataClick=()=>{
  navigate("/exam/search/addSinglestdData");
 }

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
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-center font-bold text-xl">
          Add Data As a Whole Class
        </p>
        <div className="flex flex-col justify-center items-center mb-10 mt-10">
          <p className="text-center font-bold">Select Class</p>
          <select
            name=""
            id=""
            className="p-2 bg-white rounded-full border border-gray-300 w-64 "
          >
            <option value="" disabled selected></option>
            <option value="">Class 1</option>
            <option value="">Class 2</option>
            <option value="">Class 3</option>
            <option value="">Class 4</option>
          </select>
        </div>
        <button
          type="button"
          className="flex justify-center bg-pink-500 rounded-full p-2 px-8 "
          onClick={AddWholeClsDataClick}>
          Search
        </button>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <p className="text-center font-bold text-xl">
          Add Data As a Single Student
        </p>
        <div className="flex flex-col justify-center items-center mb-10 mt-10">
          <p className="text-center font-bold">Enter Registration No.</p>
         <input type="text" className="p-2 rounded-full w-64 border border-gray-300"/>
        </div>
        <button
          type="button"
          className="flex justify-center bg-pink-500 rounded-full p-2 px-8 "
        onClick={AddSingleStdDataClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
