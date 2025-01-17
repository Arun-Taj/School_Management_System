import React, { useContext, useEffect, useState } from "react";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PromoteStudent = () => {
  const navigate = useNavigate();
  // Dummy data to replicate the table
  const { api } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [classes, setClasses] = useState([]);
  const [rows, setRows] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterOption, setFilterOption] = useState("individual");
  const [showSubmit, setShowSubmit] = useState(false);

  const [filteredRows, setFilteredRows] = useState(rows);
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

  const fetchData = async () => {
    try {
      const response = await api.get("/student/");
      // console.log(response.data);
      setRows(response.data);
      setFilteredRows(response.data);
      setPagination({
        ...pagination,
        totalRecords: response.data.length,
        totalPages: Math.ceil(response.data.length / pagination.recordsPerPage),
      });
    } catch (error) {
      alert("Something went wrong");
    }
    try {
      const response = await api.get("/get_classes_for_config/");
      // console.log("classes", response.data);

      setClasses(response.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    fetchData();
  }, [api]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter rows based on search query (name or class)
  const handleSearchClick = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = rows.filter(
      (row) =>
        row.student_full_name.toLowerCase().includes(lowerCaseQuery) ||
        row.enrollmentId.toLowerCase() == lowerCaseQuery ||
        classes
          .find((class_data) => class_data.id == row.classOfAdmission)
          ?.name.toLowerCase()
          .replace("class", "")
          .includes(lowerCaseQuery.replace("class", ""))
    );
    setFilteredRows(results);
    setShowSubmit(true);
  };

  // Reset the search and display all rows
  const handleRefreshClick = () => {
    setSearchQuery("");
    setFilteredRows(rows);
    setShowSubmit(false);
  };

  const handleClassChange = (index, new_class_id) => {
    const new_rows = filteredRows.map((row, i) => {
      if (i == index) {
        row.classOfAdmission = parseInt(new_class_id);
      }
      return row;
    });

    setFilteredRows(new_rows);
  };

  const promote = () => {
    try {
      const response = api.post("/students/promote/", filteredRows);
      alert("Students promoted successfully!");
      navigate("/students/allStudents");
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-8 bg-pink-100 min-h-full">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Students</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Promote Students" text */}
        <div>
          <span className="text-gray-700 font-medium">Promote Students</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-4 justify-end items-center py-10 px-8">
        <div className="">
          <div className="relative flex items-center bg-white rounded-full">
            {/* Filter Icon */}

            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp
              className="ml-4 text-gray-600 hover:text-blue-500 transform hover:scale-110 transition-transform duration-200 text-xl"
              size={24}
              onClick={() => setShowFilterOptions((prev) => !prev)}
            />
            {/* Sorting Options Popup */}
            {showFilterOptions && (
              <div className="absolute left-[-150px]">
                {/* Tooltip container */}
                <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                  {/* Tip/Arrow
                              <div className="absolute top-0 right-2 w-3 h-3 bg-white border-l border-t border-gray-300 transform rotate-45 -translate-y-1/2"></div> */}

                  {/* Sort Options */}
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setShowFilterOptions(false);
                      setFilterOption("individual");
                    }}
                  >
                    individual
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setShowFilterOptions(false);
                      setFilterOption("classwise");
                    }}
                  >
                    class-wise
                  </div>
                  {/* Tip/Arrow at the bottom */}
                </div>
              </div>
            )}

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-4"></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder={
                filterOption === "individual"
                  ? "eg. ENR-DDA1F1DA8C	or John Doe"
                  : "eg. class 01"
              }
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
            />

            {/* Search Icon */}
            {searchQuery.length > 0 && (
              <IoSearch
                className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
                size={24}
                onClick={handleSearchClick}
              />
            )}
          </div>
        </div>
        {/* Refresh Button */}
        <div
          className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
          onClick={handleRefreshClick}
        >
          <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl w-full">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="">
            <tr className="">
              <th className="p-2 py-6">Enrollment ID</th>
              <th className="p-2 py-6">Name</th>
              <th className="p-2 py-6">Father's Name</th>
              <th className="p-2 py-6">Gender</th>
              <th className="p-2 py-6">Class</th>
              <th className="p-2 py-6">Roll No.</th>
              <th className="p-2 py-6">Promote to</th>
            </tr>
          </thead>
          <tbody>
            {showSubmit ? (
              filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <tr
                    key={index}
                    className={`border border-gray-300 ${
                      index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                    }`}
                  >
                    <td className="p-2 text-center">{row.enrollmentId}</td>
                    <td className="p-2 text-center">{row.student_full_name}</td>
                    <td className="p-2 text-center">{row.father_full_name}</td>
                    <td className="p-2 text-center">{row.gender}</td>
                    <td className="p-2 text-center">
                      {
                        classes.find((class_data) => {
                          return class_data.id === row.classOfAdmission;
                        })?.name
                      }
                    </td>
                    <td className="p-2 text-center">{row.rollNo}</td>
                    <td className="p-2 text-center">
                      <select
                        className="border border-gray-400 rounded-3xl p-2 px-10 bg-white"
                        onChange={(e) =>
                          handleClassChange(index, e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Select Class
                        </option>
                        {classes &&
                          classes.map((class_data) => {
                            return (
                              <option value={class_data.id}>
                                {class_data.name}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No students found.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Please search for students.
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

      {showSubmit && filteredRows.length > 0 && (
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-3xl shadow-md hover:bg-pink-600"
            onClick={promote}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoteStudent;
