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
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllStudents = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]); // Store original data before editing
  const [classes, setClasses] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterOption, setFilterOption] = useState("name");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 1,
  });

  const { api } = useContext(AuthContext);

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

  // Load data from API
  useEffect(() => {
    console.log("getting students");

    const fetchData = async () => {
      try {
        const response = await api.get("/student/");
        setRows(response.data);
        setPagination({
          ...pagination,
          totalRecords: response.data.length,
          totalPages: Math.ceil(
            response.data.length / pagination.recordsPerPage
          ),
        });
        setOriginalRows(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
        // Log additional details from the error response
        if (error.response) {
          // console.error("Response data:", error.response.data);
        }
      }
      try {
        const response = await api.get("/get_classes_for_config/");
        // console.log(response.data);

        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isSearchTermValid = (lowerCaseSearchTerm) => {
    if (!lowerCaseSearchTerm.includes(",")) {
      alert("Invalid search term, please enter comma separated search term.");
      return false;
    } else {
      return true;
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let new_rows = filteredRows;
    switch (filterOption) {
      case "name":
        new_rows = rows.filter((row) => {
          const fullName = `${row.student_full_name}`.toLowerCase();
          return fullName.includes(lowerCaseSearchTerm);
        });
        break;

      case "class":
        new_rows = rows.filter((row) => {
          return classes
            .find((cls) => cls.id == row.classOfAdmission)
            ?.name.toLowerCase()
            .includes(lowerCaseSearchTerm);
        });
        break;

      case "gender":
        new_rows = rows.filter((row) => {
          return row.gender && row.gender.toLowerCase() == lowerCaseSearchTerm;
        });
        break;

      case "enrollmentId":
        new_rows = rows.filter((row) => {
          return (
            row.enrollmentId &&
            row.enrollmentId.toLowerCase() == lowerCaseSearchTerm
          );
        });
        break;

      case "class&rollNo":
        if (isSearchTermValid(lowerCaseSearchTerm)) {
          const search_class = lowerCaseSearchTerm.split(",")[0];
          const search_rollNo = lowerCaseSearchTerm.split(",")[1];
          new_rows = rows.filter((row) => {
            return (
              classes
                .find((cls) => cls.id == row.classOfAdmission)
                ?.name.toLowerCase()
                .includes(search_class) && row.rollNo == search_rollNo
            );
          });
        }
        break;

      case "name&fatherName":
        if (isSearchTermValid(lowerCaseSearchTerm)) {
          const name = lowerCaseSearchTerm.split(",")[0];
          const fatherName = lowerCaseSearchTerm.split(",")[1];
          new_rows = rows.filter((row) => {
            return (
              row.student_full_name.toLowerCase().includes(name) &&
              row.father_full_name.toLowerCase().includes(fatherName)
            );
          });
        }
        break;

      case "class&gender":
        if (isSearchTermValid(lowerCaseSearchTerm)) {
          const class_name = lowerCaseSearchTerm.split(",")[0];
          const gender = lowerCaseSearchTerm.split(",")[1].trim();

          new_rows = rows.filter((row) => {
            return (
              classes
                .find((cls) => cls.id == row.classOfAdmission)
                ?.name.toLowerCase()
                .includes(class_name) &&
              row.gender.toLowerCase() == gender.toLowerCase()
            );
          });
        }
        break;

      default:
        new_rows = filteredRows;
    }

    setFilteredRows(new_rows);
  };

  const handleRefresh = () => {
    setFilteredRows(rows);
    rows.forEach((row, index) => {
      row.isEditing = false;
    });
    setSearchTerm("");
    setPagination({
      ...pagination,
      currentPage: 1,
      recordsPerPage: 10,
    });
  };

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

  const handleDelete = async (index, studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

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
    const student = filteredRows[index];
    navigate("/student/edit", {
      state: {
        student,
        classes,
      },
    });
  };

  const handleCancel = (index) => {
    const newRows = [...filteredRows];
    newRows[index] = { ...originalRows[index], isEditing: false }; // Restore original row data
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
      // console.log(key);

      if (key == "studentMiddleName" || key == "fatherMiddleName") {
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
      // Make the API call to update the student
      const response = await api.patch(`/student/${student.id}/`, FORMDATA);

      // Update the row with the new data
      const newRows = [...filteredRows];
      newRows[index] = {
        ...newRows[index],
        ...response.data,
        isEditing: false,
      }; // Update the row with response data
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

  const handleView = (index) => {
    const student = filteredRows[index];
    navigate("/student/view", { state: { student, classes } });
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
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
            <div className=" relative flex items-center bg-white rounded-full">
              <IoFilterSharp
                className="ml-4 text-gray-600 hover:text-blue-500 transform hover:scale-110 transition-transform duration-200 text-xl"
                size={24}
                onClick={() => setShowFilterOptions((prev) => !prev)}
              />
              {/* Sorting Options Popup */}
              {showFilterOptions && (
                <div className="absolute left-[-150px] top-0">
                  {/* Tooltip container */}
                  <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                    {/* Sort Options */}
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("name");
                      }}
                    >
                      Name
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("enrollmentId");
                      }}
                    >
                      Enrollment ID
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("gender");
                      }}
                    >
                      Gender
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("class");
                      }}
                    >
                      Class
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("class&rollNo");
                      }}
                    >
                      Class & Roll No
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("name&fatherName");
                      }}
                    >
                      Name & FatherName
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setShowFilterOptions(false);
                        setSearchTerm("");
                        setFilterOption("class&gender");
                      }}
                    >
                      Class & Gender
                    </div>
                    {/* Tip/Arrow at the bottom */}
                  </div>
                </div>
              )}
              <div className="w-px h-6 bg-gray-600 mx-4"></div>
              <input
                type="text"
                placeholder={
                  filterOption === "name"
                    ? "eg. John Doe"
                    : filterOption === "enrollmentId"
                      ? "eg. ENR-10EABB4BD0	"
                      : filterOption === "gender"
                        ? "eg. male/female"
                        : filterOption === "class"
                          ? "eg. class 01"
                          : filterOption === "class&rollNo"
                            ? "eg. class 01, rollno 1"
                            : filterOption === "name&fatherName"
                              ? "eg. John Doe, Father Name"
                              : filterOption === "class&gender"
                                ? "eg. class 01, male/female"
                                : "Search"
                }
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
                      className={`border border-gray-300 ${index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                        }`}
                    >
                      <td className="p-2 text-center">{row.enrollmentId}</td>
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
                          row.studentFirstName +
                          " " +
                          row.studentMiddleName +
                          " " +
                          row.studentLastName
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
                          <select
                            value={row.classOfAdmission}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "classOfAdmission",
                                e.target.value
                              )
                            }
                            className="border rounded w-full py-1 px-2"
                          >
                            {classes.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          classes.find((c) => c.id === row.classOfAdmission)
                            ?.name
                        )}
                      </td>
                      <td className="p-2 text-center">{row.rollNo}</td>
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

        {/* pagination  */}
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
    </>
  );
};

export default AllStudents;
