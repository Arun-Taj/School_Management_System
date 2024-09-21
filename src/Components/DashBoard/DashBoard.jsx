import React from "react";
import { CiUser } from "react-icons/ci";
import { FaToolbox } from "react-icons/fa";
import TableChart from "./Table&Chart";

const Dashboard = () => {
  return (
    <div className="flex flex-col p-8 bg-pink-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6">
        {/* Total Students */}
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
            <div className="text-[20px] font-bold">Total Students</div>
            <div className="flex justify-between items-center pt-2">
              <CiUser size={48} />
              <p className="font-sans text-3xl font-bold">50</p>
            </div>
          </div>

          {/* Total Employees */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
            <div className="text-[20px] font-bold">Total Employees</div>
            <div className="flex justify-between items-center pt-2">
              <FaToolbox size={48} />
              <p className="font-sans text-3xl font-bold">50</p>
            </div>
          </div>
        </div>

        {/* Revenue and Expense */}
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-1 flex flex-col justify-between h-full">
          <div>
            <div className="text-[20px] font-bold">Revenue</div>
            <div className="text-[48px] font-bold flex justify-between items-center">
              <p>₹</p>
              <p>7,800</p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p>This Month</p>
              <p>₹ 5,000</p>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div>
            <div className="text-[20px] font-bold">Expense</div>
            <div className="text-[48px] font-bold flex justify-between items-center">
              <p>₹</p>
              <p>3,600</p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p>This Month</p>
              <p>₹ 2,000</p>
            </div>
          </div>
        </div>

        {/* Total Profit and Dues */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-300 p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
              <div className="text-[20px] font-bold">Total Profit</div>
              <div className="text-[32px] font-bold flex justify-between items-center">
                <p>₹</p>
                <p>4,200</p>
              </div>
              <div className="text-sm flex justify-between items-center">
                <p>This Month</p>
                <p>₹ 3,000</p>
              </div>
            </div>

            <div className="bg-red-300 p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
              <div className="text-[20px] font-bold">Dues</div>
              <div className="text-[32px] font-bold flex justify-between items-center">
                <p>₹</p>
                <p>20,200</p>
              </div>
              <div className="text-sm flex justify-between items-center">
                <p>This Month</p>
                <p>₹ 15,000</p>
              </div>
            </div>
          </div>

          {/* Fee Collection Progress Bars */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            {["This Month", "Last Month", "This Year"].map((label) => (
              <>
                <div key={label} className="text-sm mb-2 flex justify-between">
                  <p>{label} Fee Collection</p>
                  <p>65%</p>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  {/* Adjust width based on the collection percentage */}
                  {label === "This Month" && (
                    <div className="bg-purple-500 h-2 rounded-full w-4/6"></div>
                  )}
                  {label === "Last Month" && (
                    <div className="bg-purple-500 h-2 rounded-full w-3/6"></div>
                  )}
                  {label === "This Year" && (
                    <div className="bg-purple-500 h-2 rounded-full w-4/6"></div>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>

      </div>

      {/* Table Chart Section */}
      {/* Ensure it takes full width on smaller screens */}
      <TableChart />
    </div>
  );
};

export default Dashboard;
