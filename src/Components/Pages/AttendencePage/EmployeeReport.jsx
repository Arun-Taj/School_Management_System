import React,{useState} from "react";
import { FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import SearchCompo from "./Components/SearchCompo";
import Table from "./Components/Table";

// Function to get the current month's dates
const getCurrentMonthDates = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const EmployeeReport = () => {

  const dates = getCurrentMonthDates();

  // Sample data for demonstration
  const students =Array(7).fill (
    {
      rollNo: 35,
      name: "Rahul Kumar Debnath",
      class: "08",
      attendance: Array.from({ length: dates.length }, (_, i) =>
        i % 3 === 0 ? "P" : i % 3 === 1 ? "A" : "L"
      ), // Randomly assigning P, A, L for demonstration
      totalP: 15,
      totalA: 10,
      totalL: 5,
    },
    // Add more student records as needed
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // May

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  return (
    <div className="bg-pink-100 p-8 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Attendance</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">
          Employee Attendance Report
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

      {/* Months Slider */}
      <div className="flex items-center justify-center mb-4">
        <button onClick={handlePreviousMonth}>
          <FaChevronLeft className="text-gray-600 hover:text-gray-800" />
        </button>
        <h2 className="mx-4 text-lg font-semibold">{months[currentMonthIndex]} Month</h2>
        <button onClick={handleNextMonth}>
          <FaChevronRight className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>



      {/* Table */}
      <div className=" bg-white py-4 rounded-lg shadow-lg">
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-2 text-center">Roll No.</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Class</th>
                <th className="p-2 text-center">
                  <p className="">Date</p>
                  
                  <div className="flex overflow-x-auto max-w-[500px] ">
                    {dates.map((date, i) => (
                      <div key={i} className="p-2 ">
                        {date}
                      </div>
                    ))}
                  </div>
                </th>

                <th className="p-2 ">Total P</th>
                <th className="p-2 ">Total A</th>
                <th className="p-2 ">Total L</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2==0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
                >
                  <td className="p-2 text-center">{student.rollNo}</td>
                  <td className="p-2 text-center">{student.name}</td>
                  <td className="p-2 text-center">{student.class}</td>
                  <td className="p-2 ">
                    <div className="overflow-x-auto max-w-[500px]  ">
                      
                      <div className="flex">  
                          {student.attendance.map((status, i) => (
                            <div key={i} className="p-2">
                              {status}
                            </div>
                          ))}
                        </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{student.totalP}</td>
                  <td className="p-2 text-center">{student.totalA}</td>
                  <td className="p-2 text-center">{student.totalL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pl-2">
        <div className="flex items-center space-x-2">
          {[10, 25, 50].map((size) => (
            <button className="p-2 px-3 rounded-full border border-gray-300">
              {size}
            </button>
          ))}
          <span className="text-sm">Records per page</span>
        </div>

        <div className="flex space-x-1 items-center pr-2">
          <p>Showing 1 to 10 of 15 records</p>
          <button className="p-1 rounded-full border border-gray-300">
            <MdChevronLeft size={24} />
          </button>
          <p className="border border-gray-300 px-3 py-1 rounded-full">1</p>
          <button className="p-1 rounded-full border border-gray-300">
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
      <SearchCompo/>
      <Table/>
    </div>
  );
};

export default EmployeeReport;
