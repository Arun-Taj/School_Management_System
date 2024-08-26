import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";

const AllStudents = () => {
  // Dummy data to replicate the table
  const rows = Array(7).fill({
    enrollmentId: "01249999",
    name: "Rahul Kumar Debnath",
    fatherName: "Subham Kumar Debnath",
    gender: "Male",
    class: "08",
    rollNo: "35",
    phoneNo: "0123456789",
  });

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-4 ">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Students</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">All Students</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-4 justify-end items-center py-10">
        <div className=" ">
          <div className="flex items-center  bg-white rounded-full ">
            {/* Left Side: Three-Line Menu Icon */}
            <HiOutlineMenu className="text-gray-600 ml-4" size={24} />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-4"></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />

            {/* Right Side: Search Icon */}
            <IoSearch className="text-gray-600 mr-4" size={24} />
          </div>
        </div>
        <div className="border border-[#BCA8EA] p-2 rounded-full">
          <FiRefreshCcw />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead className="">
            <tr className="">
              <th className="p-2 py-6">Enrollment ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Gender</th>
              <th className="p-2 py-6">Class</th>
              <th className="p-2 py-6">Roll No.</th>
              <th className="p-2 py-6">Phone No.</th>
              <th className="p-2 py-6">Action</th>
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
                <td className="p-2 text-center">{row.gender}</td>
                <td className="p-2 text-center">{row.class}</td>
                <td className="p-2 text-center">{row.rollNo}</td>
                <td className="p-2 text-center">{row.phoneNo}</td>
                <td className="p-2 text-center">
                  <button className="mr-2 p-1 text-black">
                    <FaRegEye />
                  </button>
                  <button className="mr-2 p-1 text-black">
                    <MdOutlineEdit />
                  </button>
                  <button className="p-1 text-black">
                    <RiDeleteBin6Line />
                  </button>
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
        <div className="text-sm text-gray-600">
          Showing 1 to 25 of 78 records
        </div>
        <div className="flex space-x-2 items-center">
          <button className="px-3   ">
            <IoIosArrowDropleft size={30} />
          </button>
          <p className="border border-gray-400 px-2 rounded-full"> 1</p>
          <button className="px-3 ">
            <IoIosArrowDropright size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
