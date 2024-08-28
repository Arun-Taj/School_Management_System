import React from "react";
import { MdAccountBalanceWallet } from "react-icons/md";

import SearchBar from "./SearchBar";

import TableReceipt from "./TableReceipt";

const FeeReceipt = () => {
  return (
    <div className="bg-pink-100 p-8">
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

      <div className="flex items-center justify-between">
        <div className="flex flex-row p-2  gap-4 items-center">
          <div className="flex flex-col items-center">
            <label htmlFor="" className="font-bold">
              Receipt
            </label>
            <input
              type="text"
              name=""
              id=""
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 bg-slate-100"
            />
          </div>
          <div className="flex flex-col items-center ">
            <label htmlFor="" className="font-bold">
              Date
            </label>
            <input
              type="date"
              name=""
              id=""
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="" className="font-bold">
              Enrollent Id
            </label>
            <input
              type="text"
              name=""
              id=""
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
            />
          </div>
        </div>

        <div className="mt-6">
          <SearchBar />
        </div>
      </div>

      <TableReceipt />
    </div>
  );
};

export default FeeReceipt;
