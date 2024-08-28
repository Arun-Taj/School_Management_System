import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const attendanceData = [
  {
    rollNo: 35,
    name: "Rahul Kumar Debnath",
    class: "08",
    attendance: ['P', 'A', 'L', 'P', 'A', 'L', 'P', 'A', 'L', 'P', 'L', 'P', 'A', 'L', 'A', 'L'],
  },
  // Duplicate for demonstration
  {
    rollNo: 35,
    name: "Rahul Kumar Debnath",
    class: "08",
    attendance: ['P', 'A', 'L', 'P', 'A', 'L', 'P', 'A', 'L', 'P', 'L', 'P', 'A', 'L', 'A', 'L'],
  },
  // Add more rows as needed
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EmployeeReport = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // May

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <div className="p-4">
      {/* Month Slider */}
      <div className="flex items-center justify-center mb-4">
        <button onClick={handlePreviousMonth}>
          <FaChevronLeft className="text-gray-600 hover:text-gray-800" />
        </button>
        <h2 className="mx-4 text-lg font-semibold">{months[currentMonthIndex]} Month</h2>
        <button onClick={handleNextMonth}>
          <FaChevronRight className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-2">Roll No.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Date</th>
              {[...Array(16)].map((_, index) => (
                <th key={index} className="p-2">{index + 1}</th>
              ))}
              <th className="p-2">Total P</th>
              <th className="p-2">Total A</th>
              <th className="p-2">Total L</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((data, rowIndex) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
                <td className="p-2">{data.rollNo}</td>
                <td className="p-2">{data.name}</td>
                <td className="p-2">{data.class}</td>
                <td className='p-2'></td>
                <td className="p-2"><div className="bg-purple-300 h-2"></div></td>
                {data.attendance.map((status, colIndex) => (
                  <td key={colIndex} className="p-2 text-center">{status}</td>
                ))}
                <td className="p-2 text-center">{data.attendance.filter(status => status === 'P').length}</td>
                <td className="p-2 text-center">{data.attendance.filter(status => status === 'A').length}</td>
                <td className="p-2 text-center">{data.attendance.filter(status => status === 'L').length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReport;
