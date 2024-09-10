import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaHandPaper } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

const MarkEmployee = () => {
  // Dummy data to replicate the table
  const rows = Array(7).fill({
    enrollmentId: "01249999",
    name: "Rahul Kumar Debnath",
    fatherName: "Subham Kumar Debnath",
    type: "Teacher",
   
   
  });

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaHandPaper className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Attendence </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Mark Employee Attendance</span>
        </div>
      </div>


      <div className="flex justify-between my-10">
      <div className="flex gap-4 items-center">
        <input type="date" name="" id="" className="p-2 rounded-3xl border border-gray-300"/>

        
        <div className="bg-white p-2 px-4 rounded-full border border-gray-300">
           <IoSearch/>
        </div>
       

      </div>
      <div className="flex flex-row gap-4 justify-end items-center">
        <div className=" ">
          <div className="flex items-center  bg-white rounded-full p-2 px-3 border border-gray-300">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp className="text-gray-600 " size={24} />

            
          </div>
        </div>
        <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
          <FiRefreshCcw />
        </div>
      </div></div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead className="">
            <tr className="">
              <th className="p-2 py-6">Employee ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Type</th>
              
              
              
              <th className="p-2 py-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border border-gray-300 ${
                  index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                }`}
              >
                <td className="p-2 text-center">{row.enrollmentId}</td>
                <td className="p-2 text-center">{row.name}</td>
                <td className="p-2 text-center">{row.fatherName}</td>
                <td className="p-2 text-center">{row.type}</td>
               
                
                
                <td className="p-2  flex flex-row justify-center gap-4">
                  <p className="bg-green-500 rounded-full px-2">P</p>
                  <p className="bg-red-600 rounded-full px-2">A</p>
                  <p className="rounded-full px-2 bg-white">L</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
      <div className="flex justify-center">
        <button className="bg-pink-500 text-white py-2 px-8 rounded-full hover:bg-pink-600">Submit</button>
      </div>
      
    </div>
  );
};

export default MarkEmployee;
