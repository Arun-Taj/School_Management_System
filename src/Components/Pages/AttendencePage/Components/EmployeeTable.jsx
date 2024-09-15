import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

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

const EmployeeTable = () => {
  const now = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  // Get dates for the currently selected month
  const dates = getMonthDates(year, currentMonthIndex);

  // Sample data for demonstration, now dynamic based on selected month
  const employees = [
    {
      employeeId: "012345",
      name: "Rahul Kumar Debnath",
      type: "Teacher",
      attendance: generateAttendance(dates.length), // Dynamically set attendance based on the current month's number of days
      totalP: generateAttendance(dates.length).filter((a) => a === "P").length,
      totalA: generateAttendance(dates.length).filter((a) => a === "A").length,
      totalL: generateAttendance(dates.length).filter((a) => a === "L").length,
    },
    {
      employeeId: "012346",
      name: "Sita Sharma",
      type: "Teacher",
      attendance: generateAttendance(dates.length), // Dynamically set attendance based on the current month's number of days
      totalP: generateAttendance(dates.length).filter((a) => a === "P").length,
      totalA: generateAttendance(dates.length).filter((a) => a === "A").length,
      totalL: generateAttendance(dates.length).filter((a) => a === "L").length,
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


  return (
    <div >
     
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
                <th className="p-2 text-center">Employee ID</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Type</th>
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
              {employees.map((employee, index) => (
                <tr key={employee.employeeId} className={index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}>
                  <td className="p-2 text-center">{employee.employeeId}</td>
                  <td className="p-2 text-center">{employee.name}</td>
                  <td className="p-2 text-center">{employee.type}</td>
                  <td className="p-2">
                    {/* Scrollable Attendance (Sync with Date Scroll) */}
                    <div
                      ref={(el) => (attendanceScrollRefs.current[index] = el)}
                      className="flex overflow-x-hidden max-w-[500px]"  // Changed overflow to hidden
                    >
                      <div className="flex">
                        {employee.attendance.map((status, i) => (
                          <div key={`${employee.employeeId}-${i}-${status}`} className="p-2 min-w-[40px] text-center">
                            {status}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{employee.totalP}</td>
                  <td className="p-2 text-center">{employee.totalA}</td>
                  <td className="p-2 text-center">{employee.totalL}</td>
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
    </div>
  );
};

export default EmployeeTable;
