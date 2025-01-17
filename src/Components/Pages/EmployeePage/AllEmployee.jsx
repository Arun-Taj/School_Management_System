import React, { useState, useContext, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdSave, MdCancel } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";

const AllEmployee = () => {
  const navigate = useNavigate();
  const { api } = useContext(AuthContext);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [roles, setRoles] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalRows, setOriginalRows] = useState([]); // To store original data before editing

  const [selectedFilter, setSelectedFilter] = useState("employeeId");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 1,
  });
  const applyPagination = () => {
    let startIndex =
      pagination.totalRecords == 0
        ? 0
        : pagination.currentPage * pagination.recordsPerPage -
          pagination.recordsPerPage;
    let endIndex =
      pagination.currentPage * pagination.recordsPerPage >
      pagination.totalRecords
        ? pagination.totalRecords
        : pagination.currentPage * pagination.recordsPerPage;

    setFilteredRows(rows.slice(startIndex, endIndex));
  };
  useEffect(() => {
    applyPagination();
  }, [rows, pagination]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/employee/");
        // console.log(response.data);
        setRows(response.data);
        setPagination({
          ...pagination,
          totalRecords: response.data.length,
          totalPages: Math.ceil(
            response.data.length / pagination.recordsPerPage
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();

    const getRoles = async () => {
      try {
        const response = await api.get("/get_roles/");

        if (response.data.length > 0) {
          setRoles(response.data);
        } else {
          alert("Please request admin to add roles first, then try again");
          navigate("/employees/allEmployees");
        }
      } catch (error) {
        alert("Something went wrong");
        // console.error("Error fetching roles:", error);
      }
    };

    getRoles();

    const getSubjects = async () => {
      try {
        const response = await api.get("/get_subjects_for_config/");

        if (response.data.length > 0) {
          setSubjects(response.data);
        } else {
          alert("Please add subjects first, then try again");
          navigate("/config/createSub");
        }
      } catch (error) {
        alert("Something went wrong");
        // console.error("Error fetching subjects:", error);
      }
    };

    getSubjects();
  }, [api]);

  const setRecordsPerPage = (recordsPerPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      recordsPerPage: parseInt(recordsPerPage),
      currentPage: 1,
      totalPages: Math.ceil(
        prevPagination.totalRecords / parseInt(recordsPerPage)
      ),
    }));
  };

  // Function to handle search
  const handleSearch = () => {
    let newRows = [];
    if (selectedFilter === "employeeId") {
      newRows = rows.filter((row) => {
        return row.employeeId
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    } else if (selectedFilter === "name") {
      newRows = rows.filter((row) => {
        const fullName =
          `${row.employeeFirstName} ${row.employeeMiddleName} ${row.employeeLastName}`.toLowerCase();

        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else if (selectedFilter === "role") {
      newRows = rows.filter((row) =>
        roles?.some(
          (role) =>
            role.id === row.selectRole &&
            role.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (selectedFilter === "gender") {
      console.log(searchTerm);

      newRows = rows.filter((row) => {
        return (
          row.gender && row.gender.toLowerCase() == searchTerm.toLowerCase()
        );
      });
    }
    setFilteredRows(newRows);
  };

  // Function to refresh the page
  const handleRefresh = () => {
    setFilteredRows(rows.map((row) => ({ ...row, isEditing: false }))); // Reset all rows, ensuring no edit mode
    setSearchTerm(""); // Clear search term
    setPagination({
      ...pagination,
      currentPage: 1,
      recordsPerPage: 10,
    });
  };

  // Function to delete a row
  const handleDelete = async (index) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // Proceed with deletion if confirmed
    if (confirmDelete) {
      // const newRows = filteredRows.filter((_, i) => i !== index);
      // setRows(newRows);
      // setFilteredRows(newRows);
      const employeeID = rows[index].id;

      try {
        // Make the API call to delete the student
        await api.delete(`/employee/${employeeID}/`);

        // Filter out the deleted student from the state
        const newRows = filteredRows.filter((_, i) => i !== index);
        setRows(newRows);
        setFilteredRows(newRows);

        // alert("Student deleted successfully.");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  // Function to handle edit
  const handleEdit = (index) => {
    const employee = filteredRows[index];
    navigate("/employees/edit", { state: { employee } });
  };

  // Function to cancel editing (restore original data)
  const handleCancel = (index) => {
    const newRows = [...filteredRows];
    // Revert the row data to its original values
    newRows[index] = { ...originalRows[index], isEditing: false }; // Restore original row data and exit editing mode
    setFilteredRows(newRows);
  };

  function splitName(name) {
    // Split the name using whitespace

    if (!name) {
      return { firstName: "", lastName: "", middleName: "" };
    }
    const words = name.trim().split(/\s+/);

    // Initialize variables
    let firstName, lastName, middleName;

    if (words.length === 1) {
      // If there is only one word, treat it as the first name
      firstName = words[0];
      lastName = "";
      middleName = "";
    } else if (words.length === 2) {
      // If there are two words, assign them to first and last name
      firstName = words[0];
      lastName = words[1];
      middleName = "";
    } else {
      // For three or more words
      firstName = words[0]; // First word
      lastName = words[words.length - 1]; // Last word
      // Join the remaining words for middleName
      middleName = words.slice(1, words.length - 1).join(" ");
    }

    return {
      firstName,
      lastName,
      middleName,
    };
  }

  // Function to save changes
  const handleSave = async (index) => {
    const employee = filteredRows[index];
    // console.log(employee);
    const empNameObj = splitName(employee.name);
    const fatherNameObj = splitName(employee.fatherName);

    // console.log(empNameObj, fatherNameObj);
    const updatedData = {
      // Add your fields here that you want to update
      employeeFirstName: empNameObj.firstName,
      employeeMiddleName: empNameObj.middleName,
      employeeLastName: empNameObj.lastName,
      fatherFirstName: fatherNameObj.firstName,
      fatherMiddleName: fatherNameObj.middleName,
      fatherLastName: fatherNameObj.lastName,
      gender: employee.gender,
      phoneNumber: employee.phoneNumber,
      mainSubject: employee.mainSubject,
    };
    // console.log("updatedData", updatedData);

    // Create a new FormData object
    const FORMDATA = new FormData();

    // Append each field to the FormData object
    for (const key in updatedData) {
      //check that key is not empty
      // console.log(key);

      if (key == "employeeMiddleName" || key == "fatherMiddleName") {
        // this means, if middlename is empty commit it as empty to database
        if (updatedData.hasOwnProperty(key)) {
          FORMDATA.append(key, updatedData[key]);
        }
      } else {
        // this means, if key is not middlename then first check for not empty then only commit to database
        if (updatedData[key] !== "") {
          if (updatedData.hasOwnProperty(key)) {
            FORMDATA.append(key, updatedData[key]);
          }
        }
      }
    }

    try {
      // Make the API call to update the employee
      const response = await api.patch(`/employee/${employee.id}/`, FORMDATA);

      // Update the row with the new data
      const newRows = [...filteredRows];
      newRows[index] = {
        ...newRows[index],
        ...response.data,
        isEditing: false,
      }; // Update the row with response data
      setFilteredRows(newRows);
      setRows(newRows);

      // newRows[index].isEditing = false; // Mark the row as not being edited
    } catch (error) {
      console.error("Failed to update employee data:", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Function to handle change in input fields
  const handleChange = (index, field, value) => {
    const newRows = [...filteredRows];
    newRows[index][field] = value;
    setFilteredRows(newRows);
  };

  const handleView = (index) => {
    const employee = filteredRows[index];

    navigate("/employees/view", {
      state: { employee },
    });
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
        <div className="relative">
          <div className="flex items-center  bg-white rounded-full ">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp
              className="text-gray-600 ml-4 cursor-pointer"
              size={24}
              onClick={() => setShowFilterOptions((prev) => !prev)} // Trigger filter on click
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
          {showFilterOptions && (
            <div className="absolute top-[-100px] left-[-155px]">
              {/* Tooltip container */}
              <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                {/* Filter Options */}

                {/* Filter Options */}
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("employeeId");
                    setShowFilterOptions(false);
                    setSearchTerm("");
                  }}
                >
                  Employee ID
                </div>
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("name");
                    setShowFilterOptions(false);
                    setSearchTerm("");
                  }}
                >
                  Name
                </div>
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("role");
                    setShowFilterOptions(false);
                    setSearchTerm("");
                  }}
                >
                  Role
                </div>
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("gender");
                    setShowFilterOptions(false);
                    setSearchTerm("");
                  }}
                >
                  Gender
                </div>
              </div>
            </div>
          )}
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
              <th className="p-2 py-6">Role</th>
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
                          value={row.employeeId}
                          readOnly
                          className="border rounded w-full py-1 px-2"
                        />
                      ) : (
                        row.employeeId
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
                        row.employeeFirstName +
                        " " +
                        row.employeeMiddleName +
                        " " +
                        row.employeeLastName
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
                        row.fatherFirstName +
                        " " +
                        row.fatherMiddleName +
                        " " +
                        row.fatherLastName
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.selectRole}
                          onChange={(e) =>
                            handleChange(index, "selectRole", e.target.value)
                          }
                          className="border rounded w-full py-1 px-2"
                        />
                      ) : (
                        roles &&
                        roles.find((role) => role.id === row.selectRole)?.name
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
                        subjects &&
                        subjects.find(
                          (subject) => subject.id === row.mainSubject
                        )?.name
                      )}
                    </td>

                    <td className="p-2 text-center">
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.phoneNumber}
                          onChange={(e) =>
                            handleChange(index, "phoneNumber", e.target.value)
                          }
                          className="border rounded w-full py-1 px-2"
                        />
                      ) : (
                        row.phoneNumber
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
                          <button
                            className="p-1 mr-2 text-black w-8 h-8 flex justify-center items-center transition-colors duration-300 hover:bg-gray-400"
                            onClick={() => handleView(index)}
                          >
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
          <button
            className={
              pagination.recordsPerPage == 10
                ? "bg-[#BCA8EA] text-white px-3 py-2 border border-gray-400 rounded-full "
                : "px-3 py-2 border border-gray-400 rounded-full "
            }
            value="10"
            onClick={(e) => setRecordsPerPage(e.currentTarget.value)}
          >
            10
          </button>
          <button
            className={
              pagination.recordsPerPage == 25
                ? "bg-[#BCA8EA] text-white px-3 py-2 border border-gray-400 rounded-full "
                : "px-3 py-2 border border-gray-400 rounded-full "
            }
            value="25"
            onClick={(e) => setRecordsPerPage(e.currentTarget.value)}
          >
            25
          </button>
          <button
            className={
              pagination.recordsPerPage == 50
                ? "bg-[#BCA8EA] text-white px-3 py-2 border border-gray-400 rounded-full "
                : "px-3 py-2 border border-gray-400 rounded-full "
            }
            value="50"
            onClick={(e) => setRecordsPerPage(e.currentTarget.value)}
          >
            50
          </button>
          <p>Records per page </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600 ">
            Showing{" "}
            {pagination.totalRecords == 0
              ? 0
              : pagination.currentPage * pagination.recordsPerPage -
                (pagination.recordsPerPage - 1)}{" "}
            &nbsp; to &nbsp;
            {pagination.currentPage * pagination.recordsPerPage >
            pagination.totalRecords
              ? pagination.totalRecords
              : pagination.currentPage * pagination.recordsPerPage}{" "}
            &nbsp; of {pagination.totalRecords} records
          </div>
          <div className="flex space-x-2 items-center">
            <button
              className="px-3  "
              onClick={() =>
                pagination.currentPage > 1 &&
                setPagination({
                  ...pagination,
                  currentPage: pagination.currentPage - 1,
                })
              }
            >
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full">
              {" "}
              {pagination.currentPage}
            </p>
            <button
              className="px-3 "
              onClick={() =>
                pagination.currentPage < pagination.totalPages &&
                setPagination({
                  ...pagination,
                  currentPage: pagination.currentPage + 1,
                })
              }
            >
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployee;
