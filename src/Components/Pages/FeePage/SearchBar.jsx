import React from "react";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div>
      <div className="flex flex-row gap-4 justify-end items-center py-10 ">
        <div className=" ">
          <div className="flex items-center  bg-white rounded-full border border-gray-400 ">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp className="text-gray-600 ml-4" size={24} />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-4"></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none text-center "
            />

            {/* Right Side: Search Icon */}
            <IoSearch className="text-gray-600 mr-4" size={24} />
          </div>
        </div>
        <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
          <FiRefreshCcw />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
