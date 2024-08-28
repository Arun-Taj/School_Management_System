import React from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { MdLocalPrintshop } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import StatementTable from "./StatementTable";
import {IoIosArrowDropleft,IoIosArrowDropright} from 'react-icons/io'

const Statement = () => {
  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <MdAccountBalanceWallet className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Account</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Account Statement</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row p-2 gap-4 mt-4 items-center">
          <input type="date" name="" id="" className="rounded-3xl p-2" />
          <p>To</p>
          <input type="date" name="" id="" className="rounded-3xl p-2" />
          {/* Search Bar */}

          <div className="flex items-center  bg-white rounded-full ">
            {/* Right Side: Search Icon */}
            <IoSearch className="text-gray-600 ml-2" size={24} />
            {/* Input Field */}
            <input
              type="text"
              placeholder="Statement"
              className=" py-2 pl-2  placeholder-black bg-transparent focus:outline-none"
            />
          </div>

          {/* <div className="bg-white p-3 rounded-full border border-[#BCA8EA]">
              <FiRefreshCcw />
            </div> */}
          
          <span className="flex items-center justify-center  bg-white rounded-full ">
            {/* Right Side: Search Icon */}
            <SlCalender className="text-gray-600 ml-3" size={24} />
            {/* Input Field */}
            <input
              type="text"
              placeholder="Statement"
              className=" py-2 pl-2  placeholder-black bg-transparent focus:outline-none"
            />
          </span>
         
        </div>
        <div className="flex flex-row">
          <MdLocalPrintshop size={24} className="text-gray-600 ml-4" />
          <IoFilterSharp className="text-gray-600 ml-4" size={24} />
          <FiRefreshCcw size={24} className="text-gray-600 ml-4" />
        </div>

      </div>
      <div className="pt-6"><StatementTable/></div>
      <div className="mt-4 flex justify-between items-center pb-10">
        <div className="flex space-x-2 items-center">
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            10
          </button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            25
          </button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            50
          </button>
          <p>Records per page </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600 ">
            Showing 1 to 25 of 78 records
          </div>
          <div className="flex space-x-2 items-center">
            <button className="px-3  ">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3 ">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statement;
