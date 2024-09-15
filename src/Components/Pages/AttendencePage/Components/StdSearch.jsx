import React, { useState } from "react";

import { FiRefreshCcw } from "react-icons/fi";

import { IoFilterSharp } from "react-icons/io5";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchCompo = () => {


  const [selectedDate, setSelectedDate]=useState(null);



  return (
    <div>

      <div className="flex flex-row gap-4  py-10 justify-between">
        <div className="flex gap-4 ">
          <div className="flex items-center  bg-white rounded-full w-3/4 md:w-full border border-gray-300">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp className="text-gray-600 ml-4 cursor-pointer" size={24} />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-2 "></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search Student"
              className="max-w-36   py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />
          </div>
          <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      className="p-2 rounded-3xl border border-gray-300 text-center w-32 cursor-pointer"
      placeholderText="mm-yyy"
    />
        </div>

        <div className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg" >
            <FiRefreshCcw  className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl"/>
          </div>
      </div>
    </div>
  );
};

export default SearchCompo;
