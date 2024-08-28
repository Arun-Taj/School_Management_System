import React from "react";
import Table from "./ChartTable";
import { MdAccountBalanceWallet } from "react-icons/md";

const AddIncome = () => {
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
          <span className="text-gray-700 font-medium">Add Income</span>
        </div>
      </div>
      <div className="flex justify-center bg-pink-100">
        <div className="w-1/2 mt-10 flex flex-col bg-white shadow-md rounded-2xl  items-center ">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">Add Income</h3>
          <input
            type="date"
            className="p-2 px-4  rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Income Head"
          />

          <select
            name=""
            id=""
            className="p-2 px-4  rounded-3xl bg-white mt-4 border border-blue-500 w-2/3"
          >
            <option value="" disabled selected>
              Income Head
            </option>
            <option value="">Smart</option>
            <option value="">Gentlement</option>
            <option value="">Sporty</option>
          </select>
          <input
            type="text"
            className="p-2 px-4  mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Particulars(Option)"
          />
          <input
            type="text"
            className="p-2 px-4 mb-4 mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Amount"
          />
          <button type="submit" className="mt-8 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-12 ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
