import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaEye } from "react-icons/fa6";

const AddWholeClsData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [editingIndex, setEditingIndex] = useState(null);

  const data = Array(15).fill({
    icon: <FaEye />,
    enrollmentId: "01249999",
    studentName: "Rahul Kumar Debnath ",
    fatherName:"Johnson Kumar Tajpuriya",
    rollNo: "35",
    marks: {
      English: 78,
      Math: 78,
      Science: 78,
      Social: 78,
      Computer: 89,
      Geography: 68,
      Gk: 78,
    },
  });

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeRecordsPerPage = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = (index) => {
    // Save the edited marks
    setEditingIndex(null);
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700" />
          <span className="text-gray-700 font-medium">Exam</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Add/Update Exam Marks</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Add Data As a Whole class</span>
        </div>
      </div>

      <p className="flex items-center justify-center font-bold pt-10 text-2xl pb-6">
        Insert Obtained Marks (Class 08)
      </p>

      <div className="w-full max-w-7xl bg-white py-4 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse overflow-x-scroll">
            <thead>
              <tr className="bg-white">
                {[
                  "Enrollment ID",
                  "Student Name",
                  "Father's Name",
                  "Roll No.",
                  "English",
                  "Math",
                  "Science",
                  "Social",
                  "Computer",
                  "Geography",
                  "Gk",
                  "Action",
                ].map((header) => (
                  <th key={header} className="p-2 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index} className={index % 2 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}>
                  <td className="p-2">{record.enrollmentId}</td>
                  <td className="p-2">{record.studentName}</td>
                  <td className="p-2 ">{record.fatherName}</td>
                  <td className="p-2">{record.rollNo}</td>
                  {Object.keys(record.marks).map((subject, i) => (
                    <td key={i} className={`p-2 ${editingIndex === index ? "min-w-[100px]" : ""}`}>
                      {editingIndex === index ? (
                        <input
                          type="number"
                          defaultValue={record.marks[subject]}
                          className="w-14 rounded-full pl-1"
                        />
                      ) : (
                        record.marks[subject]
                      )}
                    </td>
                  ))}
                  <td className="p-2">
                    {editingIndex === index ? (
                      <button
                        onClick={() => handleSaveClick(index)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            {[10, 25, 50].map((size) => (
              <button
                key={size}
                onClick={() => setRecordsPerPage(size)}
                className={`p-2 px-3 rounded-full ${
                  recordsPerPage === size
                    ? "bg-purple-700 text-white"
                    : "bg-white text-purple-700 border border-purple-700"
                }`}
              >
                {size}
              </button>
            ))}
            <span className="text-sm">Records per page</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">
              Showing {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, data.length)} of {data.length}{" "}
              records
            </span>
            <div className="flex space-x-1 items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded-full ${
                  currentPage === 1 ? "text-gray-400" : "text-purple-700"
                }`}
              >
                <IoIosArrowDropleft size={40} />
              </button>
              <p className="border border-gray-400 px-3 py-1 rounded-full">
                {currentPage}
              </p>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded-full ${
                  currentPage === totalPages
                    ? "text-gray-400"
                    : "text-purple-700"
                }`}
              >
                <IoIosArrowDropright size={40} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <button type='submit' className="bg-pink-500 p-2 px-6 rounded-full">Submit</button>
      </div>
    </div>
  );
};

export default AddWholeClsData;
