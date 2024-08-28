import React from "react";
import { MdHome, MdAccountBalanceWallet } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import Table from "./ChartTable";
const ChartAccount = () => {
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
          <span className="text-gray-700 font-medium">Chart of Account</span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl  items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            Add Chart of Account
          </h3>
          <input
            type="text"
            className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Name of head"
          />
          <select
            name=""
            id=""
            className="p-3 px-4 rounded-3xl bg-white mt-4 border border-blue-500 w-2/3"
          >
            <option value="" disabled selected>
              Type
            </option>
            <option value="">Smart</option>
            <option value="">Gentlement</option>
            <option value="">Sporty</option>
          </select>

          <button className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-4 font-bold mb-16">
            Save Head
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4  py-10 justify-end">
            <div className=" ">
              <div className="flex items-center  bg-white rounded-full ">
                {/* Left Side: Three-Line Menu Icon */}
                <IoFilterSharp className="text-gray-600 ml-4" size={24} />

                {/* Vertical Line Divider */}
                <div className="w-px h-6 bg-gray-600 mx-4"></div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Search"
                  className=" py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
                />

                {/* Right Side: Search Icon */}
                <IoSearch className="text-gray-600 mr-4" size={24} />
              </div>
            </div>
            <div className="bg-white p-3 rounded-full border border-[#BCA8EA]">
              <FiRefreshCcw />
            </div>
          </div>
          <Table/>
        </div>
      </div>
    </div>
  );
};

export default ChartAccount;
