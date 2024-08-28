import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
const StudentAttendenceReport = () => {
  return (
    <div className="bg-pink-100 p-8">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Attendence </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">
            Mark Student Attendance
          </span>
        </div>
      </div>

      <div className="flex justify-between my-10">
        <div className="flex gap-4 items-center">
          <select
            name=""
            id=""
            className="rounded-3xl bg-white p-2 border border-gray-300"
          >
            <option value="" selected disabled>
              Select Class
            </option>
            <option value="">Class 1</option>
            <option value="">Class 2</option>
            <option value="">Class 3</option>
          </select>
          <input
            type="date"
            name=""
            id=""
            className="p-2 rounded-3xl border border-gray-300"
          />
          <div className="bg-white p-2 px-4 rounded-full border border-gray-300">
            <IoSearch />
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center">
          
          <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
            <FiRefreshCcw />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendenceReport;
