import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";

const FeeReport = () => {
  // Dummy data to replicate the table
  const rows =Array(10).fill(
    {
      receiptNo: '205',
      date: '14-05-2024',
      enrollmentId: '01249999',
      studentName: 'Rahul Kumar Debnath',
      class: '08',
      description: 'Monthly fee paid for - January, February and March ',
    },
    // Add more rows as needed
  );

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Employee</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">All Employees</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-row p-2  gap-4 items-center">
          <div className="flex flex-col items-center">
           
            <input
              type="date"
              name=""
              id=""
              placeholder=""
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
            />
          </div>
          <p>To</p>
          <div className="flex flex-col items-center ">
            
            <input
              type="date"
              name=""
              id=""
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
            />
          </div>
          <div className="flex flex-col items-center">
           
            <input
              type="text"
              name=""
              id=""
              placeholder="This Month"
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 placeholder-black"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-row gap-4 justify-end items-center py-10">
          <div className="flex items-center  bg-white rounded-full border border-gray-400">
            <input
              type="text"
              placeholder="Enrollment Id"
              className="flex-grow px-4 py-2 text-gray-600 placeholder-black bg-transparent focus:outline-none "
            />

            {/* Right Side: Search Icon */}
            <IoSearch className="text-gray-600 mr-4" size={24} />
          </div>

          <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
            <FiRefreshCcw />
          </div>
        </div>
      </div>
      

      <div className="flex flex-row justify-end gap-4 mb-8">
        <MdLocalPrintshop size={24}/>
        <RiDeleteBin6Line size={24}/>
      </div>


      {/* Table */}
      <div className="overflow-auto max-w-full max-h-96 rounded-2xl shadow-lg">
      <table className="min-w-full border-collapse border border-gray-300  rounded-lg overflow-hidden">
        <thead className="sticky top-0 bg-white">
          <tr>
            {['Receipt No.', 'Date', 'Enrollment ID', 'Student Name', 'Class', 'Description'].map((header, index) => (
              <th key={index} className="p-2 py-6 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border border-gray-300 ${
                index % 2 === 0 ? 'bg-[#BCA8EA]' : 'bg-[#E3D6FF]'
              }`}
            >
              <td className="p-2 text-center ">{row.receiptNo}</td>
              <td className="p-2 text-center ">{row.date}</td>
              <td className="p-2 text-center ">{row.enrollmentId}</td>
              <td className="p-2 text-center ">{row.studentName}</td>
              <td className="p-2 text-center ">{row.class}</td>
              <td className="p-2 text-center ">{row.description}</td>
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
    </div>
  );
};

export default FeeReport;
