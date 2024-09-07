import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

const AllStudents = () => {
  const initialRows = [
    {
      enrollmentId: "01240001",
      name: "Rahul Kumar Debnath",
      fatherName: "Subham Kumar Debnath",
      gender: "Male",
      class: "08",
      rollNo: "35",
      phoneNo: "0123456789",
    },
    {
      enrollmentId: "01240002",
      name: "Ram Kumar Shah",
      fatherName: "Vishnu Kumar Shah",
      gender: "Male",
      class: "09",
      rollNo: "23",
      phoneNo: "0987654321",
    },
    {
      enrollmentId: "01240003",
      name: "Sita Devi",
      fatherName: "Raghav Das",
      gender: "Female",
      class: "07",
      rollNo: "12",
      phoneNo: "9876543210",
    },
    {
      enrollmentId: "01240004",
      name: "Ravi Shankar",
      fatherName: "Mohan Shankar",
      gender: "Male",
      class: "10",
      rollNo: "05",
      phoneNo: "8765432109",
    },
    {
      enrollmentId: "01240005",
      name: "Pooja Kumari",
      fatherName: "Rajesh Kumar",
      gender: "Female",
      class: "06",
      rollNo: "19",
      phoneNo: "7654321098",
    },
    {
      enrollmentId: "01240006",
      name: "Arjun Singh",
      fatherName: "Bhagat Singh",
      gender: "Male",
      class: "11",
      rollNo: "41",
      phoneNo: "6543210987",
    },
    {
      enrollmentId: "01240007",
      name: "Neha Verma",
      fatherName: "Satish Verma",
      gender: "Female",
      class: "12",
      rollNo: "29",
      phoneNo: "5432109876",
    }
    // Add more dummy data as needed
  ];

  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);


  // Function to filter rows based on criteria
  const filterRows = (criteria) => {
    const filtered = rows.filter((row) => {
      const { enrollmentId, name, gender, class: studentClass, rollNo: studentRollNo, phoneNo, fatherName } = row;
      return (
        enrollmentId.includes(criteria) ||
        name.includes(criteria) ||
        gender.includes(criteria) ||
        studentClass.includes(criteria) ||
        studentRollNo.includes(criteria)||
        phoneNo.includes(criteria)
        // (studentClass + row.rollNo).includes(criteria) ||
        // (name + fatherName).includes(criteria)
      );
    });
    setFilteredRows(filtered);
  };

  // Function to handle search
  const handleSearch = () => {
    filterRows(searchTerm);
  };

  // Function to refresh the page
  const handleRefresh = () => {
    setFilteredRows(initialRows);
    setSearchTerm("");
  };

  // Function to delete a row
  const handleDelete = (index) => {
    const newRows = filteredRows.filter((_, i) => i !== index);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  // Function to handle edit
   // Function to handle edit
   const handleEdit = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = true; // Mark the row as being edited
    setFilteredRows(newRows);
  };

  // Function to save changes
  const handleSave = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = false; // Mark the row as not being edited
    setFilteredRows(newRows);
  };

  // Function to handle change in input fields
  const handleChange = (index, field, value) => {
    const newRows = [...filteredRows];
    newRows[index][field] = value; // Update the specific field
    setFilteredRows(newRows);
  };

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Students</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">All Students</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-4 justify-end items-center py-10">
        <div>
          <div className="flex items-center bg-white rounded-full">
            <IoFilterSharp
              className="text-gray-600 ml-4 cursor-pointer"
              size={24}
              onClick={() => filterRows(searchTerm)} // Trigger filter on click
            />
            <div className="w-px h-6 bg-gray-600 mx-4"></div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />
            <IoSearch
              className="text-gray-600 mr-4 cursor-pointer"
              size={24}
              onClick={handleSearch} // Trigger search on click
            />
          </div>
        </div>
        <div className="border border-[#BCA8EA] p-2 rounded-full bg-white cursor-pointer" onClick={handleRefresh}>
          <FiRefreshCcw />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 py-6">Enrollment ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Gender</th>
              <th className="p-2 py-6">Class</th>
              <th className="p-2 py-6">Roll No.</th>
              <th className="p-2 py-6">Phone No.</th>
              <th className="p-2 py-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr
                key={index}
                className={`border border-gray-300 ${
                  index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                }`}
              >
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.enrollmentId}
                      readOnly
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.enrollmentId
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.fatherName}
                      onChange={(e) => handleChange(index, "fatherName", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.fatherName
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <select
                      value={row.gender}
                      onChange={(e) => handleChange(index, "gender", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    row.gender
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.class}
                      onChange={(e) => handleChange(index, "class", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.class
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.rollNo}
                      onChange={(e) => handleChange(index, "rollNo", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.rollNo
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.phoneNo}
                      onChange={(e) => handleChange(index, "phoneNo", e.target.value)}
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    row.phoneNo
                  )}
                </td>
                <td className="p-2 text-center">
                  <button className="p-1 mr-2 text-black"><FaRegEye/></button>
                  {row.isEditing ? (
                    <>
                      <button className="mr-2 p-1 text-black" onClick={() => handleSave(index)}>
                        Save
                      </button>
                      <button className="p-1 text-black" onClick={() => handleEdit(index)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="mr-2 p-1 text-black" onClick={() => handleEdit(index)}>
                      <MdOutlineEdit />
                    </button>
                  )}
                  <button className="p-1 text-black" onClick={() => handleDelete(index)}>
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center pb-10">
        <div className="flex space-x-2 items-center">
          <button className="px-3 py-2 border border-gray-400 rounded-full bg-white">10</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full bg-white">25</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full bg-white">50</button>
          <p>Records per page </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600">Showing 1 to {filteredRows.length} of {rows.length} records</div>
          <div className="flex space-x-2 items-center">
            <button className="px-3">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full">1</p>
            <button className="px-3">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
