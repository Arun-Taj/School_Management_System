import React, {useState} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdSave,MdCancel } from "react-icons/md";

const AllEmployee = () => {
  // Dummy data to replicate the table
  const initialRows = [
    {
      enrollmentId: "01249999",
      name: "Rahul Kumar Debnath",
      fatherName: "Subham Kumar Debnath",
      gender: "Male",
      mainSubject: "Science",
      phoneNo: "0123456789",
  },
  {
      enrollmentId: "01250000",
      name: "Aditi Sharma",
      fatherName: "Rajesh Sharma",
      gender: "Female",
      mainSubject: "Mathematics",
      phoneNo: "0123456780",
  },
  {
      enrollmentId: "01250001",
      name: "Vikram Singh",
      fatherName: "Anil Singh",
      gender: "Male",
      mainSubject: "History",
      phoneNo: "0123456781",
  },
  {
      enrollmentId: "01250002",
      name: "Sneha Patel",
      fatherName: "Ramesh Patel",
      gender: "Female",
      mainSubject: "Biology",
      phoneNo: "0123456782",
  },
  {
      enrollmentId: "01250003",
      name: "Rohit Verma",
      fatherName: "Kumar Verma",
      gender: "Male",
      mainSubject: "Physics",
      phoneNo: "0123456783",
  },
  {
    enrollmentId: "01250004",
    name: "Priya Gupta",
    fatherName: "Suresh Gupta",
    gender: "Female",
    mainSubject: "Chemistry",
    phoneNo: "0123456784",
},
{
    enrollmentId: "01250005",
    name: "Karan Mehta",
    fatherName: "Deepak Mehta",
    gender: "Male",
    mainSubject: "English",
    phoneNo: "0123456785",
},
  ]
   const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalRows, setOriginalRows] = useState([]); // To store original data before editing

  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  // Function to filter rows based on criteria
  const filterRows = (criteria) => {
    // Convert criteria to lowercase for case-insensitive matching
    const lowercasedCriteria = criteria.toLowerCase();

    const filtered = rows.filter((row) => {
      const {
        enrollmentId,
        name,
        fatherName,
        gender,
        mainSubject,
        phoneNo,
        
      } = row;

      
     
      // Check other fields for partial matches (case-insensitive)
      const matchesEnrollmentId = enrollmentId
        .toLowerCase()
        .includes(lowercasedCriteria);

      const matchesName = name.toLowerCase().includes(lowercasedCriteria);

      const matchesGender = gender.toLowerCase() === lowercasedCriteria; // Exact match for gender
      const matchesMainSubject = mainSubject
        .toLowerCase()
        .includes(lowercasedCriteria);

      const matchesPhoneNo = phoneNo.toLowerCase().includes(lowercasedCriteria);

      const matchesFatherName = fatherName
        .toLowerCase()
        .includes(lowercasedCriteria);

     
      

      // If no exact match for class, check other fields
      return (
        matchesEnrollmentId ||
        matchesName ||
        matchesGender ||
        matchesPhoneNo ||
        matchesFatherName ||
        matchesMainSubject
      );
    });

    // If no rows match, show "No data found" message
    if (filtered.length > 0) {
      setFilteredRows(filtered);
    } else {
      setFilteredRows([{ message: "No data found" }]);
    }
  };

  // Function to handle search
  const handleSearch = () => {
    filterRows(searchTerm);
  };

  // Function to refresh the page
  const handleRefresh = () => {
    setFilteredRows(rows.map(row => ({ ...row, isEditing: false }))); // Reset all rows, ensuring no edit mode
    setSearchTerm(""); // Clear search term
  };

  // Function to delete a row
  const handleDelete = (index) => {
    const newRows = filteredRows.filter((_, i) => i !== index);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  // Function to handle edit
  const handleEdit = (index) => {
    const newRows = [...filteredRows];
  newRows[index].isEditing = true; // Mark the row as being edited

  // Store original row data if not already stored
  const originalRowData = [...originalRows];
  originalRowData[index] = { ...newRows[index] }; // Store a copy of the row before editing
  setOriginalRows(originalRowData);

  setFilteredRows(newRows);
  };

  // Function to cancel editing (restore original data)
  const handleCancel = (index) => {
    const newRows = [...filteredRows];
    // Revert the row data to its original values
    newRows[index] = { ...originalRows[index], isEditing: false }; // Restore original row data and exit editing mode
    setFilteredRows(newRows);
  };

  // Function to save changes
  const handleSave = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = false; // Mark the row as not being edited
    setFilteredRows(newRows);
    setRows(newRows); 
  };

  // Function to handle change in input fields
  const handleChange = (index, field, value) => {
    const newRows = [...filteredRows];
    newRows[index][field] = value;
    setFilteredRows(newRows);
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <MdBusinessCenter className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Employee</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">All Employees</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-4 justify-end items-center py-10">
        <div className=" ">
          <div className="flex items-center  bg-white rounded-full ">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp
              className="text-gray-600 ml-4 cursor-pointer"
              size={24}
              onClick={() => filterRows(searchTerm)} // Trigger filter on click
            />
            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-4"></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />
            <IoSearch
              className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
              size={24}
              onClick={handleSearch} // Trigger search on click
            />
          </div>
        </div>
        <div
          className="border border-[#BCA8EA] p-2 rounded-full bg-white cursor-pointer hover:bg-[#BCA8EA] hover:text-white transition-colors duration-100"
          onClick={handleRefresh}
        >
          <FiRefreshCcw />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead className="">
            <tr className="">
              <th className="p-2 py-6">Employee ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Gender</th>
              <th className="p-2 py-6">Main Subject</th>
              
              <th className="p-2 py-6">Phone No.</th>
              <th className="p-2 py-6">Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredRows.length > 0 ? (
              filteredRows[0].message ? (
                // If there's a message like "No data found", show this row
                <tr>
                  <td colSpan="7" className="p-2 text-center text-gray-500">
                    {filteredRows[0].message}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => (
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
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChange(index, "fatherName", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChange(index, "gender", e.target.value)
                          }
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
                          value={row.mainSubject}
                          onChange={(e) =>
                            handleChange(index, "mainSubject", e.target.value)
                          }
                          className="border rounded w-full py-1 px-2"
                        />
                      ) : (
                        row.mainSubject
                      )}
                    </td>
                
                <td className="p-2 text-center">
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.phoneNo}
                          onChange={(e) =>
                            handleChange(index, "phoneNo", e.target.value)
                          }
                          className="border rounded w-full py-1 px-2"
                        />
                      ) : (
                        row.phoneNo
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {row.isEditing ? (
                        // Show Save and Cancel buttons when in edit mode
                        <div className="flex justify-center items-center">
                          <button
                            className="mr-2 p-1 text-black w-8 h-8 flex justify-center items-center  transition-colors duration-300 hover:bg-[#59d66a] "
                            onClick={() => handleSave(index)}
                          >
                            <MdSave className="text-lg" />
                          </button>
                          <button
                            className="p-1 text-black w-8 h-8 flex justify-center items-center transition-colors duration-300 hover:bg-red-500 hover:text-white"
                            onClick={() => handleCancel(index)}
                          >
                            <MdCancel className="text-lg" />
                          </button>
                        </div>
                      ) : (
                        // Show Eye, Edit, and Delete buttons when not in edit mode
                        <div className="flex justify-center items-center">
                          <button className="p-1 mr-2 text-black w-8 h-8 flex justify-center items-center transition-colors duration-300 hover:bg-gray-400">
                            <FaRegEye className="text-lg" />
                          </button>
                          <button
                            className="mr-2 p-1 text-black w-8 h-8 flex justify-center items-center transition-colors duration-300 hover:bg-blue-400 hover:text-white"
                            onClick={() => handleEdit(index)}
                          >
                            <MdOutlineEdit className="text-lg" />
                          </button>
                          <button
                            className="p-1 text-black w-8 h-8 flex justify-center items-center transition-colors duration-300 hover:bg-red-600 hover:text-white"
                            onClick={() => handleDelete(index)}
                          >
                            <RiDeleteBin6Line className="hover:text-lg" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )
            ) : (
              // If filteredRows is empty (though unlikely with the logic above)
              <tr>
                <td colSpan="7" className="p-2 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
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
          <div className="text-sm text-gray-600 ">
            Showing 1 to 25 of 78 records
          </div>
          <div className="flex space-x-2 items-center">
            <button className="px-3  ">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3 ">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployee;
