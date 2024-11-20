import React, { useState, useEffect, useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit, MdSave } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllStudents = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]); // Store original data before editing




  const { api } = useContext(AuthContext);

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Optionally log the current access token
        const accessToken = localStorage.getItem("access_token");
        // console.log("Current Access Token:", accessToken);
  
        const response = await api.get("/student/");
        console.log(response.data);
        setRows(response.data);
        setFilteredRows(response.data);
        setOriginalRows(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
        // Log additional details from the error response
        if (error.response) {
          // console.error("Response data:", error.response.data);
        }
      }
    };
  
    fetchData();
  }, [api]);
  

  const filterRows = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase();

    const filtered = rows.filter((row) => {
      const { enrollmentId, name, gender, class: studentClass, phoneNo, fatherName } = row;

      const matchesEnrollmentId = enrollmentId.toLowerCase().includes(lowercasedCriteria);
      const matchesName = name.toLowerCase().includes(lowercasedCriteria);
      const matchesGender = gender.toLowerCase() === lowercasedCriteria; // Exact match for gender
      const matchesPhoneNo = phoneNo.toLowerCase().includes(lowercasedCriteria);
      const matchesFatherName = fatherName.toLowerCase().includes(lowercasedCriteria);
      const matchesClass = String(studentClass).toLowerCase() === lowercasedCriteria; // Exact match for class

      return (
        matchesEnrollmentId ||
        matchesName ||
        matchesGender ||
        matchesPhoneNo ||
        matchesFatherName ||
        matchesClass
      );
    });

    setFilteredRows(filtered.length > 0 ? filtered : [{ message: "No data found" }]);
  };

  const handleSearch = () => {
    filterRows(searchTerm);
  };

  const handleRefresh = () => {
    setFilteredRows(rows);
    setSearchTerm("");
  };

  const handleDelete = async (index, studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  
    if (confirmDelete) {
      try {
        
        // Make the API call to delete the student
        await api.delete(`/student/${studentId}/`);
  
        // Filter out the deleted student from the state
        const newRows = filteredRows.filter((_, i) => i !== index);
        setRows(newRows);
        setFilteredRows(newRows);
        
        // alert("Student deleted successfully.");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };

  const handleEdit = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = true; // Mark the row as being edited
    setFilteredRows(newRows);
  };

  const handleCancel = (index) => {
    const newRows = [...filteredRows];
    newRows[index] = { ...originalRows[index], isEditing: false }; // Restore original row data
    setFilteredRows(newRows);
  };

  function splitName(name) {
    // Split the name using whitespace

    if (!name) {
        return { firstName: '', lastName: '', middleName: '' };
    }
    const words = name.trim().split(/\s+/);

    // Initialize variables
    let firstName, lastName, middleName;

    if (words.length === 1) {
        // If there is only one word, treat it as the first name
        firstName = words[0];
        lastName = '';
        middleName = '';
    } else if (words.length === 2) {
        // If there are two words, assign them to first and last name
        firstName = words[0];
        lastName = words[1];
        middleName = '';
    } else {
        // For three or more words
        firstName = words[0]; // First word
        lastName = words[words.length - 1]; // Last word
        // Join the remaining words for middleName
        middleName = words.slice(1, words.length - 1).join(' ');
    }

    

    return {
        firstName,
        lastName,
        middleName
    };
  }


  const handleSave = async (index) => {
    const student = filteredRows[index];
    // console.log(student);

    const stuObj = splitName(student.name);
    const fatherObj = splitName(student.fatherName);
    
  
    const updatedData = {
      // Add your fields here that you want to update
      studentFirstName: stuObj.firstName, 
      studentMiddleName: stuObj.middleName,
      studentLastName: stuObj.lastName, 
      fatherFirstName: fatherObj.firstName,
      fatherMiddleName: fatherObj.middleName,
      fatherLastName: fatherObj.lastName,
      classOfAdmission: student.classOfAdmission,
      gender: student.gender,
      phoneNumber: student.phoneNumber,
    };
    // console.log("updatedData", updatedData);
    
    // Create a new FormData object
    const FORMDATA = new FormData();
    
    // Append each field to the FormData object
    for (const key in updatedData) {
      //check that key is not empty
      console.log(key);
      
      if (key == 'studentMiddleName' || key == 'fatherMiddleName') { // this means, if middlename is empty commit it as empty to database
        if (updatedData.hasOwnProperty(key)) {
          FORMDATA.append(key, updatedData[key]);
        }
        
      }else{ // this means, if key is not middlename then first check for not empty then only commit to database
        if ( updatedData[key]!== ''){ 
          
          if (updatedData.hasOwnProperty(key)) {
            FORMDATA.append(key, updatedData[key]);
          }
        }
      }
    }

    try {
      // Make the API call to update the student
      const response = await api.patch(`/student/${student.id}/`, FORMDATA);
      
      // Update the row with the new data
      const newRows = [...filteredRows];
      newRows[index] = { ...newRows[index], ...response.data, isEditing: false }; // Update the row with response data
      setFilteredRows(newRows);
    } catch (error) {
      console.error("Failed to update student data:", error);
      // Handle error (e.g., show a notification)
    }
  };


  const handleChange = (index, field, value) => {
    const newRows = [...filteredRows];
    // console.log(index, field, value);
    
    newRows[index][field] = value; // Update the specific field
    setFilteredRows(newRows);
  };

  return (
    isLoading ? <div>Loading...</div> : 
    <>
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
                className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
                size={24}
                onClick={handleSearch} // Trigger search on click
              />
            </div>
          </div>
          <div
            className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
            onClick={handleRefresh}
          >
            <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl" />
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
              {filteredRows.length > 0 ? (
                filteredRows[0].message ? (
                  <tr>
                    <td colSpan="8" className="p-2 text-center text-gray-500">
                      {filteredRows[0].message}
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border border-gray-300 ${index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}`}
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
                          row.studentFirstName + " " +row.studentMiddleName +" " + row.studentLastName
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
                            row.fatherFirstName + " " +row.fatherMiddleName +" " + row.fatherLastName
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
                            value={row.classOfAdmission}
                            onChange={(e) => handleChange(index, "classOfAdmission", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.classOfAdmission
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="number"
                            value={index+1}
                            readOnly
                            onChange={(e) => handleChange(index, "rollNo", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          index+1
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.phoneNumber}
                            onChange={(e) => handleChange(index, "phoneNumber", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.phoneNumber
                        )}
                      </td>
                      {/* <td className="p-2 text-center flex justify-center gap-2">
                        {row.isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(index)}
                              className="text-green-600"
                            >
                              <MdSave />
                            </button>
                            <button
                              onClick={() => handleCancel(index)}
                              className="text-red-600"
                            >
                              <MdCancel />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600"
                            >
                              <MdOutlineEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-600"
                            >
                              <RiDeleteBin6Line />
                            </button>
                          </>
                        )}
                      </td> */}
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
                          onClick={() => handleDelete(index, row.id)}
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
                <tr>
                  <td colSpan="8" className="p-2 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllStudents;
