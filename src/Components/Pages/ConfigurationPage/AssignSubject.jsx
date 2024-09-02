import React, { useState } from "react";

import { FcSettings } from "react-icons/fc";

import Table from "./Table";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import ClassSubjects from "./ClassSubjects";

const  Classes = () => {
  

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Assign Subjects</span>
        </div>
      </div>




      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl  items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            Add New Class
          </h3>
          <div className="px-6">
          <input
            type="text"
            className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-full "
            placeholder="Name of the Class"
          />
           <input
            type="text"
            className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-full"
            placeholder="Monthly Fees"
          />
          <select
            name=""
            id=""
            className="p-3 px-4 rounded-3xl bg-white  border border-blue-500 w-full"
          >
            <option value="" disabled selected>
              Type
            </option>
            <option value="">Smart</option>
            <option value="">Gentlement</option>
            <option value="">Sporty</option>
          </select>
          </div>
          <button className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-4 font-bold mb-16">
            Save Head
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4  py-10 justify-end">
            <div className=" ">
              <div className="flex items-center  bg-white rounded-full ">

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Search"
                  className=" py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none ml-3"
                />

                {/* Right Side: Search Icon */}
                <IoSearch className="text-gray-600 mr-4" size={24} />
              </div>
            </div>
            <div className="bg-white p-3 rounded-full border border-[#BCA8EA]">
              <FiRefreshCcw />
            </div>
          </div>
          <ClassSubjects/>
        </div>
      </div>

     
    </div>
  );
};

export default Classes;
