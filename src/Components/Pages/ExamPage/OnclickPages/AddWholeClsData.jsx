import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

const AddWholeClsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editingIndexPage, setEditingIndexPage] = useState(null);

  
  const data=[
    {
    enrollmentId: "01249999",
    studentName: "Rahul Kumar Debnath",
    fatherName: "Johnson Kumar Tajpuriya",
    rollNo: "35",
    marks: {
      English: 78,
      Math: 78,
      Science: 78,
      Social: 78,
      Computer: 89,
      Geography: 68,
      Gk: 78,
    }},
    {
      enrollmentId: "01249999",
      studentName: "Rahul Kumar Debnath",
      fatherName: "Johnson Kumar Tajpuriya",
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
    },
    {
      enrollmentId: "01250000",
      studentName: "Anjali Sharma",
      fatherName: "Ramesh Sharma",
      rollNo: "36",
      marks: {
        English: 85,
        Math: 92,
        Science: 88,
        Social: 76,
        Computer: 94,
        Geography: 81,
        Gk: 83,
      },
    },
    {
      enrollmentId: "01250001",
      studentName: "Vikram Patel",
      fatherName: "Mohan Patel",
      rollNo: "37",
      marks: {
        English: 72,
        Math: 64,
        Science: 70,
        Social: 75,
        Computer: 80,
        Geography: 60,
        Gk: 65,
      },
    },
    {
      enrollmentId: "01250002",
      studentName: "Pooja Reddy",
      fatherName: "Suresh Reddy",
      rollNo: "38",
      marks: {
        English: 90,
        Math: 95,
        Science: 92,
        Social: 85,
        Computer: 96,
        Geography: 88,
        Gk: 91,
      },
    },
    {
      enrollmentId: "01250003",
      studentName: "Rohan Das",
      fatherName: "Rajiv Das",
      rollNo: "39",
      marks: {
        English: 60,
        Math: 55,
        Science: 58,
        Social: 62,
        Computer: 70,
        Geography: 50,
        Gk: 59,
      },
    },
    {
      enrollmentId: "01250004",
      studentName: "Neha Gupta",
      fatherName: "Anil Gupta",
      rollNo: "40",
      marks: {
        English: 88,
        Math: 85,
        Science: 90,
        Social: 83,
        Computer: 91,
        Geography: 84,
        Gk: 87,
      },
    },
    {
      enrollmentId: "01250005",
      studentName: "Amit Kumar",
      fatherName: "Suraj Kumar",
      rollNo: "41",
      marks: {
        English: 65,
        Math: 70,
        Science: 68,
        Social: 63,
        Computer: 78,
        Geography: 66,
        Gk: 67,
      },
    },
    {
      enrollmentId: "01250006",
      studentName: "Ritu Yadav",
      fatherName: "Vikash Yadav",
      rollNo: "42",
      marks: {
        English: 79,
        Math: 82,
        Science: 81,
        Social: 77,
        Computer: 85,
        Geography: 80,
        Gk: 83,
      },
    },
    {
      enrollmentId: "01250007",
      studentName: "Sumit Roy",
      fatherName: "Dipak Roy",
      rollNo: "43",
      marks: {
        English: 50,
        Math: 55,
        Science: 53,
        Social: 60,
        Computer: 65,
        Geography: 58,
        Gk: 59,
      },
    },
    {
      enrollmentId: "01250008",
      studentName: "Priya Singh",
      fatherName: "Karan Singh",
      rollNo: "44",
      marks: {
        English: 92,
        Math: 94,
        Science: 95,
        Social: 91,
        Computer: 98,
        Geography: 90,
        Gk: 93,
      },
    },
    {
      enrollmentId: "01250009",
      studentName: "Aditya Verma",
      fatherName: "Naresh Verma",
      rollNo: "45",
      marks: {
        English: 78,
        Math: 82,
        Science: 80,
        Social: 76,
        Computer: 88,
        Geography: 75,
        Gk: 77,
      },
    },
  ]
 const headers= [
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
  ]

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecordsPages = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeRecordsPerPage = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const [currentRecords, setCurrentRecords] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingMarks, setEditingMarks] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingMarks({ ...currentRecords[index].marks });
  };

  const handleInputChange = (subject, value) => {
    setEditingMarks({
      ...editingMarks,
      [subject]: value,
    });
  };

  const handleSaveClick = (index) => {
    const updatedRecords = [...currentRecords];
    updatedRecords[index].marks = { ...editingMarks };
    setCurrentRecords(updatedRecords);
    setEditingIndex(null);
  };
  const handleSubmit = () => {
    console.log("Submitted Data:", currentRecords);
    // Add API integration or other logic here
    alert("Data submitted successfully!");
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen ">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700" />
          <span className="text-gray-700 font-medium">Exam</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">
            Add/Update Exam Marks
          </span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">
            Add Data As a Whole class
          </span>
        </div>
      </div>

      <p className="flex items-center justify-center font-bold pt-10 text-2xl pb-6">
        Insert Obtained Marks (Class 08)
      </p>
    <div className="w-screen">

    
      <div className=" bg-white py-4  rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto ">
            <table className=" text-center border-collapse">
              <thead className="sticky top-0">
                
                <tr className="bg-white">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="p-2 whitespace-nowrap min-w-[150px]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {currentRecords.map((record, index) => (
                  <tr
                    key={index}
                    className={index % 2 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
                  >
                    <td className="p-2 min-w-[150px]">{record.enrollmentId}</td>
                    <td className="p-2 min-w-[250px]">{record.studentName}</td>
                    <td className="p-2 min-w-[250px]">{record.fatherName}</td>
                    <td className="p-2 min-w-[30px]">{record.rollNo}</td>
                    {Object.keys(record.marks).map((subject, i) => (
                      <td
                        key={i}
                        className={`p-2 ${
                          editingIndex === index
                            ? "min-w-[50px]"
                            : "min-w-[50px]"
                        }`}
                        style={i > 2 ? { whiteSpace: "nowrap" } : {}}
                      >
                        {editingIndex === index ? (
                          <input
                            type="number"
                            value={editingMarks[subject]}
                            onChange={(e) =>
                              handleInputChange(subject, e.target.value)
                            }
                            className="w-14 rounded-full pl-1"
                          />
                        ) : (
                          record.marks[subject]
                        )}
                      </td>
                    ))}
                    <td className="p-2 min-w-[200px]">
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
        </div>
      </div></div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pl-2">
        <div className="flex items-center space-x-2">
          {[10, 25, 50].map((size) => (
            <button
              key={size}
              onClick={() => setRecordsPerPage(size)}
              className="p-2 px-3 rounded-full border border-gray-300"
            >
              {size}
            </button>
          ))}
          <span className="text-sm">Records per page</span>
        </div>

        <div className="flex space-x-1 items-center pr-2">
          <p>Showing 1 to 10 of 15 records</p>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-full border border-gray-300"
          >
            <MdChevronLeft size={24} />
          </button>
          <p className="border border-gray-400 px-3 py-1 rounded-full">
            {currentPage}
          </p>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-full border border-gray-300"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <button type="submit" className="bg-pink-500 p-2 px-6 rounded-full" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddWholeClsData;
