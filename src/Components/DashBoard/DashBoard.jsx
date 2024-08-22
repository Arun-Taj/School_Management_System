import React from "react";
import { CiUser } from "react-icons/ci";
import { FaToolbox } from "react-icons/fa";
import ClassWiseReport from "./ClassWiseReport";
import Chart from "./Chart";
import Chart2 from "./Chart2"
import Chart3 from "./Chart3"
// import { Doughnut } from "react-chartjs-2";
import Dougnut from "./Dougnut";
const Dashboard = () => {
  return (
    <div className="flex flex-col  bg-gray-300 min-h-screen">
      <div className="p-6 space-x-4 flex flex-row">
        {/* Total Students */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded shadow-md h-[150px] w-[354px]">
            <div className="text-[20px] font-bold ">Total Students</div>
            <div className="flex justify-between items-center pt-2">
              <CiUser size={48} />
              <p className="font-sans text-3xl font-bold">50</p>
            </div>
          </div>

          {/* Total Employees */}
          <div className="bg-white p-4 rounded shadow-md h-[150px]">
            <div className="text-[20px] font-bold ">Total Employees</div>
            <div className="flex justify-between items-center pt-2">
              <FaToolbox size={48} />
              <p className="font-sans text-3xl font-bold">50</p>
            </div>
          </div>
        </div>

        {/* Revenue and Expense */}
        <div className="bg-white p-4 rounded shadow-md  h-[326px] w-[354px]">
          <div className="flex flex-col justify-between">
            {/* Revenue */}
           <div className="pb-4">
              <div className="text-[20px]  font-bold ">Revenue</div>
              <div className="text-[48px] font-bold flex justify-between ">
                <p>₹ </p>
                <p>7,800</p>
              </div>
              <div className="text-xs  flex justify-between">
                <p className="text-base">This month</p>
                <p className="text-base">₹ 5000</p>
              </div>
           </div>

            <hr className="border-gray-400 " />
            {/* Expense */}
            <div className="pt-4">
              <div className="text-[20px]  font-bold ">Expense</div>
              <div className="text-[48px] font-bold flex justify-between">
                <p>₹ </p>
                <p>3,600</p>
              </div>
              <div className="text-xs  flex justify-between">
                <p className="text-base">This month</p>
                <p className="text-base">₹ 2000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Profit */}
        
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <div className="bg-[#93DA8D] p-4 rounded shadow-md h-[150px] w-[354px]">
                <div className="text-[20px]  font-bold ">Total Profit</div>
                <div className="text-[48px] font-bold flex justify-between">
                  <p>₹ </p>
                  <p>3,600</p>
                </div>
                <div className="text-xs  flex justify-between">
                  <p className="text-base">This month</p>
                  <p className="text-base">₹ 2000</p>
                </div>
              </div>

              {/* Dues */}
              <div className="bg-[#D98585] p-4 rounded shadow-md h-[150px] w-[354px]">
                <div className="text-[20px]  font-bold ">Dues</div>
                <div className="text-[48px] font-bold flex justify-between">
                  <p>₹ </p>
                  <p>3,600</p>
                </div>
                <div className="text-xs  flex justify-between">
                  <p className="text-base">This month</p>
                  <p className="text-base">₹ 2000</p>
                </div>
              </div>

            </div>

            {/* Fee Collection Progress Bars */}
            <div className="bg-white p-4 rounded shadow-md w-[726px] h-[158px] top-[297px]">
              <div className="text-sm  mb-2 flex justify-between">
                <p>This Month Fee Collection</p>
                <p>67%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-500 h-2 rounded-full w-4/6"></div>
              </div>
              <div className="text-sm  mb-2 flex justify-between">
               <p> Last Month Fee Collection</p>
               <p>50%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-500 h-2 rounded-full w-3/6"></div>
              </div>
              <div className="text-sm  mb-2 flex justify-between">
                <p>This Year Fee Collection</p>
                <p>67%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-500 h-2 rounded-full w-4/6"></div>
              </div>
            </div>
          </div>
        
      </div>
      <div className="flex flex-row space-x-1 min-h-screen">
        <div className=" p-6 h-[576px] w-[880px]">
          <ClassWiseReport/>
        </div>
        <div className="p-6 text-xl flex flex-col h-[371px] w-[622px]">
          <div> 
            <Chart/>
          </div>
         
          <div className="flex flex-row space-x-4 pt-2">
            <div className=" w-[290px]"><Dougnut/></div>
            <div className=" w-[290px] "><Chart3/></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
