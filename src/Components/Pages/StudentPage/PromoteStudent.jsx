import React,{useState} from "react";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

const PromoteStudent = () => {
  // Dummy data to replicate the table
  const rows = [
    {
      "enrollmentId": "01249999",
      "name": "Rahul Kumar Debnath",
      "fatherName": "Subham Kumar Debnath",
      "gender": "Male",
      "class": "01",
      "rollNo": "35",
      "phoneNo": "0123456789"
  },
  {
      "enrollmentId": "01250000",
      "name": "Ananya Sharma",
      "fatherName": "Rajesh Sharma",
      "gender": "Female",
      "class": "02",
      "rollNo": "36",
      "phoneNo": "0123456790"
  },
  {
      "enrollmentId": "01250001",
      "name": "Vikram Singh",
      "fatherName": "Rakesh Singh",
      "gender": "Male",
      "class": "08",
      "rollNo": "37",
      "phoneNo": "0123456791"
  },
  {
      "enrollmentId": "01250002",
      "name": "Priya Verma",
      "fatherName": "Ajay Verma",
      "gender": "Female",
      "class": "05",
      "rollNo": "38",
      "phoneNo": "0123456792"
  },
  {
      "enrollmentId": "01250003",
      "name": "Amit Patel",
      "fatherName": "Suresh Patel",
      "gender": "Male",
      "class": "09",
      "rollNo": "39",
      "phoneNo": "0123456793"
  },
  {
      "enrollmentId": "01250004",
      "name": "Sneha Reddy",
      "fatherName": "Kumar Reddy",
      "gender": "Female",
      "class": "08",
      "rollNo": "40",
      "phoneNo": "0123456794"
  },
  ]
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredRows, setFilteredRows] = useState(rows); // State for filtered rows

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter rows based on search query (name or class)
  const handleSearchClick = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(lowerCaseQuery) ||
        row.class.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRows(results);
  };

  // Reset the search and display all rows
  const handleRefreshClick = () => {
    setSearchQuery("");
    setFilteredRows(rows);
  };

  return (
    <div className="p-8 bg-pink-100">
        <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Students</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Promote Students" text */}
        <div>
          <span className="text-gray-700 font-medium">Promote Students</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-4 justify-end items-center py-10 px-8">
        <div className="">
          <div className="flex items-center bg-white rounded-full">
            {/* Filter Icon */}
            <IoFilterSharp className="text-gray-600 ml-4 cursor-pointer" size={24} />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-4"></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search "
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />

            {/* Search Icon */}
            <IoSearch
              className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
              size={24}
              onClick={handleSearchClick}
            />
          </div>
        </div>
        {/* Refresh Button */}
        <div
          className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
          onClick={handleRefreshClick}
        >
          <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl w-full">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="">
            <tr className="">
              <th className="p-2 py-6">Enrollment ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Gender</th>
              <th className="p-2 py-6">Class</th>
              <th className="p-2 py-6">Roll No.</th>
              <th className="p-2 py-6">Promote to</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
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
                  <td className="p-2 text-center">
                    <select className="border border-gray-400 rounded-3xl p-2 px-10 bg-white">
                      <option value="" disabled selected>
                        Select Class
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={`0${num}`}>
                          Class {num}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center pb-10 ">
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
        <div className="flex">
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
    </div>
  );
};

export default PromoteStudent;

