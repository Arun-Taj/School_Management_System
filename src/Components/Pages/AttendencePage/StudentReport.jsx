import React, { useState,useRef,useEffect } from "react";
import { FaHandPaper } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Table from "./Components/StudentTable";
import SearchCompo from "./Components/StdSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Function to get the number of days in a given month and year
const getMonthDates = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

// Generate attendance based on the number of days in the month
const generateAttendance = (days) => {
  return Array.from({ length: days }, (_, i) =>
    i % 3 === 0 ? "P" : i % 3 === 1 ? "A" : "L"
  );
};

const StudentAttendanceReport = () => {


  
  const now = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  // Get dates for the currently selected month
  const dates = getMonthDates(year, currentMonthIndex);

  // Sample data for demonstration, now dynamic based on selected month
  const students = [
    {
      rollNo: 35,
      name: "Rahul Kumar Debnath",
      class: "08",
      attendance: generateAttendance(dates.length), // Dynamically set attendance based on the current month's number of days
      totalP: generateAttendance(dates.length).filter((a) => a === "P").length,
      totalA: generateAttendance(dates.length).filter((a) => a === "A").length,
      totalL: generateAttendance(dates.length).filter((a) => a === "L").length,
    },
    {
      rollNo: 36,
      name: "Sneha Sharma",
      class: "08",
      attendance: generateAttendance(dates.length),
      totalP: generateAttendance(dates.length).filter((a) => a === "P").length,
      totalA: generateAttendance(dates.length).filter((a) => a === "A").length,
      totalL: generateAttendance(dates.length).filter((a) => a === "L").length,
    },
    {
      rollNo: 37,
      name: "Ravi Kumar",
      class: "06",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
    {
      rollNo: 38,
      name: "Priya Singh",
      class: "07",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
    {
      rollNo: 39,
      name: "Amit Verma",
      class: "04",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
    {
      rollNo: 40,
      name: "Neha Gupta",
      class: "08",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
    {
      rollNo: 41,
      name: "Karan Mehta",
      class: "09",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
    {
      rollNo: 42,
      name: "Simran Kaur",
      class: "10",
      attendance: generateAttendance(30),
      totalP: generateAttendance(30).filter((a) => a === "P").length,
      totalA: generateAttendance(30).filter((a) => a === "A").length,
      totalL: generateAttendance(30).filter((a) => a === "L").length,
    },
  ];

  // Handle month changes
  const handlePreviousMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setYear(year - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setYear(year + 1);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  // References for date and attendance scroll containers
  const dateScrollRef = useRef(null);
  const attendanceScrollRefs = useRef([]);

  // Sync scroll positions of date and attendance
  const handleDateScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    attendanceScrollRefs.current.forEach((ref) => {
      if (ref) ref.scrollLeft = scrollLeft;
    });
  };

  // Sync attendance scroll with date scroll on initial render
  useEffect(() => {
    if (dateScrollRef.current) {
      const scrollLeft = dateScrollRef.current.scrollLeft;
      attendanceScrollRefs.current.forEach((ref) => {
        if (ref) ref.scrollLeft = scrollLeft;
      });
    }
  }, []);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Handle search functionality (Modified)
  const handleSearch = () => {
    const filtered = students.filter((student) => {
      const isClassMatch = selectedClass ? student.class === selectedClass : true;
      const isDateMatch = selectedDate
        ? new Date(selectedDate).getMonth() === currentMonthIndex
        : true;
      return isClassMatch && isDateMatch;
    });
    setFilteredStudents(filtered);
  };

  // Handle refresh functionality (Modified)
  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedDate("");
    setFilteredStudents(students); // Reset to original data
  };



  return (
    <div className="bg-pink-100 p-8 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaHandPaper className="text-gray-700" />
          <span className="text-gray-700 font-medium">Attendance</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">
            Student Attendance Report
          </span>
        </div>
      </div>

      <div className="flex justify-between my-10">
        <div className="flex gap-4 items-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-3xl bg-white p-2 border border-gray-300"
          >
            <option value="" selected disabled>
              Select Class
            </option>
            <option value="class 01">Class 01</option>
            <option value="class 02">Class 02</option>
            <option value="class 03">Class 03</option>
            <option value="class 04">Class 04</option>
            <option value="class 05">Class 05</option>
            <option value="class 06">Class 06</option>
            <option value="class 07">Class 07</option>
            <option value="class 08">Class 08</option>
            <option value="class 09">Class 09</option>
            <option value="class 10">Class 10</option>
          </select>
          <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      className="p-2 rounded-3xl border border-gray-300 text-center w-32 cursor-pointer"
      placeholderText="mm-yyy"
    />
          <div className="bg-white p-2 px-4 rounded-full border border-gray-300 hover:bg-indigo-200" onClick={handleSearch}>
            <IoSearch className="cursor-pointer transition-colors duration-300 hover:text-blue-500 text-xl"/>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center">
          <div className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg" onClick={handleRefresh}>
            <FiRefreshCcw  className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl"/>
          </div>
        </div>
      </div>

      {/* Months Slider */}
      <div className="flex items-center justify-center mb-4">
        <button onClick={handlePreviousMonth}>
          <FaChevronLeft className="text-gray-600 hover:text-gray-800" />
        </button>
        <h2 className="mx-4 text-lg font-semibold">
          {months[currentMonthIndex]} {year}
        </h2>
        <button onClick={handleNextMonth}>
          <FaChevronRight className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white py-4 rounded-lg shadow-lg">
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-2 text-center">Roll No.</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Class</th>
                <th className="p-2 text-center">
                  <p className="">Date</p>

                  {/* Scrollable Dates */}
                  <div
                    ref={dateScrollRef}
                    onScroll={handleDateScroll}
                    className="flex overflow-x-auto max-w-[500px]"
                  >
                    <div className="flex">
                      {dates.map((date) => (
                        <div key={date} className="p-2 min-w-[40px] text-center">
                          {date}
                        </div>
                      ))}
                    </div>
                  </div>
                </th>
                <th className="p-2">Total P</th>
                <th className="p-2">Total A</th>
                <th className="p-2">Total L</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.rollNo} className={index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}>
                  <td className="p-2 text-center">{student.rollNo}</td>
                  <td className="p-2 text-center">{student.name}</td>
                  <td className="p-2 text-center">{student.class}</td>
                  <td className="p-2">
                    {/* Scrollable Attendance (Sync with Date Scroll) */}
                    <div
                      ref={(el) => (attendanceScrollRefs.current[index] = el)}
                      className="flex overflow-x-hidden max-w-[500px]"  // Changed overflow to hidden
                    >
                      <div className="flex">
                        {student.attendance.map((status, i) => (
                          <div key={`${student.rollNo}-${i}-${status}`} className="p-2 min-w-[40px] text-center">
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

      {/* Search */}
      <SearchCompo/>
      <Table/>
    </div>
  );
};

export default StudentAttendanceReport;
