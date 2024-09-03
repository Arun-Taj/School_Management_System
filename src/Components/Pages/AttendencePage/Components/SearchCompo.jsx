import React from "react";

import { FiRefreshCcw } from "react-icons/fi";

import { IoFilterSharp } from "react-icons/io5";

const SearchCompo = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-row gap-4  py-10 justify-between">
        <div className="flex gap-4 ">
          <div className="flex items-center  bg-white rounded-full w-3/4 md:w-full border border-gray-300">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp className="text-gray-600 ml-4" size={24} />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-2 "></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search Student"
              className="max-w-36   py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />
          </div>
          <input
            type="date"
            className="p-2 bg-white rounded-full border border-gray-300 w-full"
          />
        </div>

        <div className="bg-white p-3 rounded-full border border-[#BCA8EA] flex justify-end">
          <FiRefreshCcw />
        </div>
      </div>
    </div>
  );
};

export default SearchCompo;
