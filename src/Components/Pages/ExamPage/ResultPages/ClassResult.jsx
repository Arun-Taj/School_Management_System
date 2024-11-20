import React from 'react'
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ClassResult = () => {
  const navigate = useNavigate();

  const handleResultClick = () => {
    navigate("/exam/classResult"); // Navigate to the edit page
  };
  return (
    <div className='p-8 bg-pink-100 min-h-screen'>
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
          <span className="text-gray-700">Class Wise Result</span>
        </div>
      </div>


<h1 className='text-center font-bold text-xl pt-10'>Class Wise Result (Bulk)</h1>
      <div className='flex flex-row justify-center gap-4 pt-10'>
        
      <span className=" text-center ">
            <p className="text-center font-bold">Select Session</p>
            <select
              name=""
              id=""
              className="p-2 bg-white rounded-full border border-gray-300 px-8 "
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
              className="p-2 bg-white rounded-full border border-gray-300  w-64"
            >
              <option value="" selected disabled></option>
              <option value="">CBSE</option>
              <option value="">NEB</option>
              <option value="">SEE</option>
              <option value="">DLE</option>
            </select>
          </span>
          <span className=" text-center ">
            <p className="text-center font-bold">Select Class</p>
            <select
              name=""
              id=""
              className="p-2 bg-white rounded-full border border-gray-300 px-8 "
            >
              <option value="" disabled selected></option>
              <option value="">Class 1</option>
              <option value="">Class 2</option>
              <option value="">Class 3</option>
              <option value="">Class 4</option>
            </select>
          </span>
      </div>

      <div className="flex flex-row gap-8 justify-center pt-24">
        <button type="button" className="bg-pink-500  p-2 px-8 rounded-full text-white" onClick={handleResultClick}>Search</button>
     
      </div>
    </div>
  )
}

export default ClassResult