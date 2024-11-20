import React, { useState } from "react";
import { FaRegEye, FaHandPaper } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

const MarkEmployee = () => {
  // Dummy data to replicate the table
  const initialRows = [
    {
      enrollmentId: "01249999",
      name: "Rahul Kumar Debnath",
      fatherName: "Subham Kumar Debnath",
      type: "Teacher",
      status: "P",
    },
    {
      enrollmentId: "01250000",
      name: "Sagar Sharma",
      fatherName: "Ram Sharma",
      type: "Staff",
      status: "A",
    },
    {
      enrollmentId: "01250001",
      name: "Ananya Gupta",
      fatherName: "Rajesh Gupta",
      type: "Teacher",
      status: "P",
    },
    {
      enrollmentId: "01250002",
      name: "Vikram Singh",
      fatherName: "Ajay Singh",
      type: "Staff",
      status: "L",
    },
    {
      enrollmentId: "01250003",
      name: "Sneha Verma",
      fatherName: "Ramesh Verma",
      type: "Teacher",
      status: "P",
    },
    {
      enrollmentId: "01250004",
      name: "Aarav Patel",
      fatherName: "Vijay Patel",
      type: "Staff",
      status: "A",
    },
    {
      enrollmentId: "01250005",
      name: "Priya Mehta",
      fatherName: "Suresh Mehta",
      type: "Teacher",
      status: "P",
    },
    {
      enrollmentId: "01249998",
      name: "Sagar Sharma",
      fatherName: "Ram Sharma",
      type: "Staff",
      status: "A",
    },
    // Add more employees here if needed
  ];

  const [rows, setRows] = useState(initialRows);

  // State to show/hide the sorting options popup
  const [showSortOptions, setShowSortOptions] = useState(false);
  const handleSortByName = (direction) => {
    const sortedRows = [...rows].sort((a, b) => {
      if (direction === "asc") {
        return a.name.localeCompare(b.name); // Ascending
      } else {
        return b.name.localeCompare(a.name); // Descending
      }
    });
    setRows(sortedRows);
    setShowSortOptions(false); // Close sort options after selection
  };

  const handleSearch = () => {
    // Perform search logic here based on searchDate and selectedClass
    if (searchDate && selectedClass) {
      console.log(`Searching for class ${selectedClass} on date ${searchDate}`);
      // Add your search logic (like filtering data, API calls, etc.)
    } else {
      console.log("Please select a date and class.");
    }
  };


  const handleRefresh = () => {
    setRows(initialRows);
  };

  const handleSubmit = () => {
    console.log("Submitted Employee Data:", rows);
    // Perform your submission logic (e.g., API call) here
  };

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4 bg-white rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaHandPaper className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Attendance </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">
            Mark Employee Attendance
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex justify-between my-10">
        <div className="flex gap-4 items-center">
          <input
            type="date"
            name=""
            id=""
            className="p-2 rounded-3xl border border-gray-300"
          />
          <div
            className="bg-white p-2 px-4 rounded-full border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-indigo-200 hover:shadow-md"
            onClick={handleSearch}
          >
            <IoSearch className="cursor-pointer transition-colors duration-300 hover:text-blue-600 text-xl"/>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center">
          <div className="">
            <div
              className="flex items-center bg-white rounded-full p-2 px-3 border border-gray-300 cursor-pointer hover:text-gray-500 transform hover:scale-110 transition-transform"
              onClick={() => setShowSortOptions((prev) => !prev)}
            >
              {/* Left Side: Three-Line Menu Icon */}
              <IoFilterSharp
                className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition-transform duration-200"
                size={24}
              />
            </div>
            {showSortOptions && (
              <div className="absolute top-14 right-0 mr-24">
                {/* Tooltip container */}
                <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                  {/* Sort Options */}

                  {/* Sort Options */}
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSortByName("asc")}
                  >
                    Short (Asc)
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSortByName("desc")}
                  >
                    Short (Desc)
                  </div>

                  {/* Tip/Arrow at the bottom */}
                  <div className="absolute bottom-0 right-2 w-3 h-3 bg-white border-r border-b border-gray-300 transform rotate-45 translate-y-1/2"></div>
                </div>
              </div>
            )}
          </div>
          <div
            className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
            onClick={handleRefresh}
          >
            <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl " />
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
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
                <td className="p-2 flex flex-row justify-center gap-4">
                  <p
                    className={`${
                      row.status === "P" ? "bg-green-500" : "bg-white"
                    } rounded-full px-2 cursor-pointer`}
                    onClick={() => {
                      const updatedRows = [...rows];
                      updatedRows[index].status = "P";
                      setRows(updatedRows);
                    }}
                  >
                    P
                  </p>
                  <p
                    className={`${
                      row.status === "A" ? "bg-red-600" : "bg-white"
                    } rounded-full px-2 cursor-pointer`}
                    onClick={() => {
                      const updatedRows = [...rows];
                      updatedRows[index].status = "A";
                      setRows(updatedRows);
                    }}
                  >
                    A
                  </p>
                  <p
                    className={`${
                      row.status === "L" ? "bg-yellow-500" : "bg-white"
                    } rounded-full px-2 cursor-pointer`}
                    onClick={() => {
                      const updatedRows = [...rows];
                      updatedRows[index].status = "L";
                      setRows(updatedRows);
                    }}
                  >
                    L
                  </p>
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
          <div className="text-sm text-gray-600">
            Showing 1 to 25 of 78 records
          </div>
          <div className="flex space-x-2 items-center">
            <button className="px-3">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          className="bg-pink-500 text-white py-2 px-8 rounded-full hover:bg-pink-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MarkEmployee;
