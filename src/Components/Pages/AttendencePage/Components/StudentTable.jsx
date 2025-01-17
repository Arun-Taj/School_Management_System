import React, { useState, useRef, useEffect, useContext } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoFilterSharp, IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { FiRefreshCcw } from "react-icons/fi";

const StudentTable = () => {
  const { api } = useContext(AuthContext);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const loadClassListFromServer = async () => {
      try {
        const response = await api.get("/get_classes_for_config/");

        setClassList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassListFromServer();
  }, [api]);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  // Get dates for the currently selected month

  const [initialStudents, setInitialStudents] = useState([]);
  const [students, setStudents] = useState(initialStudents);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    type: "name",
    term: null,
  });

  // Handle month changes
  const handlePreviousMonth = () => {
    console.log(year, month);

    if (month == 1) {
      const newMonth = 12;
      const newYear = year - 1;
      get_class_attendance_by_month_search_term(
        newYear,
        newMonth,
        searchTerm.type,
        searchTerm.term
      );
      setYear(newYear);
      setMonth(newMonth);
    } else {
      const newMonth = month - 1;
      get_class_attendance_by_month_search_term(
        year,
        newMonth,
        searchTerm.type,
        searchTerm.term
      );
      setMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const validMonth = month <= currentMonth;
    const currentYear = now.getFullYear();
    const validYear = year <= currentYear;
    if (validYear && validMonth) {
      if (month == 12) {
        const newYear = year + 1;
        const newMonth = 1;
        get_class_attendance_by_month_search_term(
          newYear,
          newMonth,
          searchTerm.type,
          searchTerm.term
        );
        setYear(newYear);
        setMonth(newMonth);
      } else {
        const newMonth = month + 1;
        get_class_attendance_by_month_search_term(
          year,
          newMonth,
          searchTerm.type,
          searchTerm.term
        );
        setMonth(newMonth);
      }
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // References for date and attendance scroll containers
  const dateScrollRef = useRef(null);
  const attendanceScrollRefs = useRef([]);

  // Sync scroll positions of date and attendance
  const handleDateScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    attendanceScrollRefs.current.forEach((ref) => {
      if (ref) ref.scrollLeft = scrollLeft;
    });
  };

  // Sync attendance scroll with date scroll on initial render
  useEffect(() => {
    if (dateScrollRef.current) {
      const scrollLeft = dateScrollRef.current.scrollLeft;
      attendanceScrollRefs.current.forEach((ref) => {
        if (ref) ref.scrollLeft = scrollLeft;
      });
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState("");
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

    setStudents(initialStudents.slice(startIndex, endIndex));
  };

  useEffect(() => {
    applyPagination();
  }, [pagination]);

  const get_class_attendance_by_month_search_term = async (
    year,
    month,
    search_type,
    search_term
  ) => {
    try {
      const response = await api.get(
        `/get_class_attendance_by_month_search_term/${year}/${month}/${search_type}/${search_term}/`
      );
      // console.log(response.data);
      setInitialStudents(response.data);
      setPagination({
        currentPage: 1,
        recordsPerPage: 10,
        totalRecords: response.data.length,
        totalPages: Math.ceil(response.data.length / pagination.recordsPerPage),
      });
    } catch (error) {
      setInitialStudents([]);
      setStudents([]);
      resetPagination();
      alert(error.response.data.message);
      // console.log(error);
    }
  };

  const resetPagination = () => {
    setPagination({
      currentPage: 1,
      recordsPerPage: 10,
      totalRecords: 0,
      totalPages: 1,
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

  // Handle search functionality (Modified)
  const handleSearch = () => {
    if (!selectedDate || !searchTerm.term) {
      alert("Please select both date and search term.");
      return;
    }

    const newMonth = parseInt(selectedDate.getMonth() + 1);
    const newYear = parseInt(selectedDate.getFullYear());

    get_class_attendance_by_month_search_term(
      newYear,
      newMonth,
      searchTerm.type,
      searchTerm.term
    );
    setYear(newYear);
    setMonth(newMonth);
  };

  // Handle refresh functionality (Modified)
  const handleRefresh = () => {
    setSearchTerm({
      type: "name",
      term: "",
    });
    setSelectedDate("");
    setMonth("");
    setYear("");
    setInitialStudents([]);
    setStudents([]);
  };

  return (
    <div className="bg-pink-100 p-8 min-h-screen">
      <div className="flex flex-row gap-4  py-10 justify-between">
        <div className="flex gap-4 ">
          <div className="relative flex items-center  bg-white rounded-full w-3/4 md:w-full border border-gray-300">
            {/* Left Side: Three-Line Menu Icon */}
            <IoFilterSharp
              className="text-gray-600 ml-4 cursor-pointer"
              size={24}
              onClick={() => setShowFilterOptions((prev) => !prev)}
            />

            {/* Vertical Line Divider */}
            <div className="w-px h-6 bg-gray-600 mx-2 "></div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search Student"
              className="max-w-36   py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
              value={searchTerm?.term}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, term: e.target.value.trim() })
              }
            />
            {showFilterOptions && (
              <div
                className="absolute"
                style={{ left: "-35px", top: "-105px" }}
              >
                {/* Tooltip container */}
                <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                  {/* Tip/Arrow
                  <div className="absolute top-0 right-2 w-3 h-3 bg-white border-l border-t border-gray-300 transform rotate-45 -translate-y-1/2"></div> */}

                  {/* Sort Options */}
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setShowFilterOptions(false);
                      setSearchTerm({
                        ...searchTerm,
                        type: "name",
                      });
                    }}
                  >
                    By Name
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setShowFilterOptions(false);
                      setSearchTerm({
                        ...searchTerm,
                        type: "enrNo",
                      });
                    }}
                  >
                    By Enrollment ID
                  </div>
                  {/* Tip/Arrow at the bottom */}
                  <div className="absolute bottom-0 left-14 w-3 h-3 bg-white border-r border-b border-gray-300 transform rotate-45 translate-y-1/2"></div>
                </div>
              </div>
            )}
          </div>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              const month = parseInt(date.getMonth() + 1);
              const year = parseInt(date.getFullYear());
              setMonth(month);
              setYear(year);
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="p-2 rounded-3xl border border-gray-300 text-center w-32 cursor-pointer"
            placeholderText="mm-yyy"
          />
          <div>
            <button
              type="button"
              className="bg-white p-2 px-4 rounded-full border border-gray-300 hover:bg-indigo-200"
              onClick={handleSearch}
            >
              <IoSearch className="cursor-pointer transition-colors duration-300 hover:text-blue-500 text-xl" />
            </button>
          </div>
        </div>

        <div className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg">
          <FiRefreshCcw
            className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl"
            onClick={handleRefresh}
          />
        </div>
      </div>
      {/* Months Slider */}
      <div className="flex items-center justify-center mb-4">
        <button onClick={handlePreviousMonth}>
          <FaChevronLeft className="text-gray-600 hover:text-gray-800" />
        </button>
        <h2 className="mx-4 text-lg font-semibold">
          {month && year
            ? `${months[month - 1]} ${year}`
            : "Please select a date"}
        </h2>
        <button onClick={handleNextMonth}>
          <FaChevronRight className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white py-4 rounded-lg shadow-lg">
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-2 text-center">Roll No.</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Class</th>
                <th className="p-2 text-center">
                  <p className="">Date</p>

                  {/* Scrollable Dates */}
                  <div
                    ref={dateScrollRef}
                    onScroll={handleDateScroll}
                    className="flex overflow-x-auto max-w-[500px]"
                  >
                    <div className="flex">
                      {students.length > 0 ? (
                        Object.keys(students[0].status).map((date) => (
                          <div
                            key={date}
                            className="p-2 min-w-[40px] text-center"
                          >
                            {date}
                          </div>
                        ))
                      ) : (
                        <div className="p-2 ">loading...</div>
                      )}
                    </div>
                  </div>
                </th>
                <th className="p-2">Total P</th>
                <th className="p-2">Total A</th>
                <th className="p-2">Total L</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 &&
                students.map((student, index) => (
                  <tr
                    key={student.rollNo}
                    className={
                      index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                    }
                  >
                    <td className="p-2 text-center">{student.rollNo}</td>
                    <td className="p-2 text-center">{student.name}</td>
                    <td className="p-2 text-center">{student.className}</td>
                    <td className="p-2">
                      <div
                        ref={(el) => (attendanceScrollRefs.current[index] = el)}
                        className="flex overflow-x-hidden max-w-[500px]" // Changed overflow to hidden
                      >
                        <div className="flex">
                          {Object.values(student.status).map((status, i) => (
                            <div
                              key={`${student.rollNo}-${i}-${status}`}
                              className="p-2 min-w-[40px] text-center"
                            >
                              {status === "" ? "--" : status}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-center">{student.totalP}</td>
                    <td className="p-2 text-center">{student.totalA}</td>
                    <td className="p-2 text-center">{student.totalL}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pl-2">
        <div className="flex items-center space-x-2">
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

        <div className="flex space-x-1 items-center pr-2">
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

export default StudentTable;
