import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ClsResSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const navigate = useNavigate();

  // Data for each student
  const data = [
    {
      enrollmentId: "01250005",
      studentName: "Priya Mehta",
      rollNo: "41",
      marks: { English: 92, Math: 91, Science: 93, Social: 95, MIL: 88, "Computer Science": 90 },
    },
    {
      enrollmentId: "01250006",
      studentName: "Rahul Sharma",
      rollNo: "42",
      marks: { English: 85, Math: 88, Science: 92, Social: 90, MIL: 80, "Computer Science": 89 },
    },
    // Add more students here
  ];

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle click on eye icon to navigate to the individual result page
  const handleResultClick = (studentData) => {
    navigate("/exam/classReport/search/individualRes", { state: studentData });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeRecordsPerPage = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Class Wise Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
      </div>

      <div>
        <p className="font-bold text-2xl text-center pt-10 pb-6">Result of Class 8</p>
      </div>

      <div className="w-full max-w-7xl bg-white py-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-center border-collapse ">
          <thead>
            <tr className="bg-white">
              {["", "Enrollment ID", "Student Name", "Roll No.", "English", "Math", "Science", "Social","MIT","Computer Science"].map((header) => (
                <th key={header} className="p-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className={index % 2 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}>
                <td className="p-2">
                  <FaEye onClick={() => handleResultClick(record)} className="cursor-pointer" />
                </td>
                <td className="p-2">{record.enrollmentId}</td>
                <td className="p-2">{record.studentName}</td>
                <td className="p-2">{record.rollNo}</td>
                {Object.values(record.marks).map((mark, i) => (
                  <td key={i} className="p-2">{mark}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          {[10, 25, 50].map((size) => (
            <button
              key={size}
              onClick={() => setRecordsPerPage(size)}
              className={`p-2 px-3 rounded-full ${recordsPerPage === size ? "bg-purple-700 text-white" : "bg-white text-purple-700 border border-purple-700"}`}
            >
              {size}
            </button>
          ))}
          <span className="text-sm">Records per page</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, data.length)} of {data.length} records
          </span>
          <div className="flex space-x-1 items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1 rounded-full ${currentPage === 1 ? "text-gray-400" : "text-purple-700"}`}
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <p className="border border-gray-400 px-3 py-1 rounded-full">{currentPage}</p>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-full ${currentPage === totalPages ? "text-gray-400" : "text-purple-700"}`}
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClsResSearch;
