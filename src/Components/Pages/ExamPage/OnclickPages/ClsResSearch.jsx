import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { sub } from "date-fns";

const ClsResSearch = () => {
  const navigate = useNavigate();

  const { api } = useContext(AuthContext);
  const [headers, setHeaders] = useState([]);
  const classResultInfo = JSON.parse(localStorage.getItem("class_result_info"));
  // Data for each student
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
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

    setData(initialData.slice(startIndex, endIndex));
  };
  useEffect(() => {
    applyPagination();
  }, [pagination]);
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

  useEffect(() => {
    const getMarks = async () => {
      try {
        const response = await api.get(
          `/get_marks/${classResultInfo.exam_id}/${classResultInfo.class_id}/`
        );
        // console.log(response.data);

        //set headers
        //prepare headers
        // permanent headers
        const permaHeaders = ["", "Enrollment ID", "Student Name"];
        const tempHeaders = response.data[0].marks.map(
          (mark) => mark.paper_name
        );
        setHeaders([...permaHeaders, ...tempHeaders]);
        //set headers

        //prepare data
        const tempData = response.data.map((student) => ({
          enrollmentId: student.enr_no,
          studentName: student.student_name,
          marks: student.marks,
        }));
        // setData(tempData);
        setInitialData(tempData);
        setPagination({
          ...pagination,
          totalRecords: tempData.length,
          totalPages: Math.ceil(tempData.length / pagination.recordsPerPage),
        });
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    getMarks();
  }, [api]);

  // Handle click on eye icon to navigate to the individual result page
  const handleResultClick = (studentData) => {
    localStorage.setItem(
      "student_result_info",
      JSON.stringify({
        exam_id: classResultInfo.exam_id,
        search_key: studentData.enrollmentId,
      })
    );
    navigate("/exam/studentResult"); // Navigate to the edit page
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
        <p className="font-bold text-2xl text-center pt-10 pb-6">
          Result of {classResultInfo.class_name}
        </p>
      </div>
      <div className="w-full max-w-7xl bg-white py-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-center border-collapse ">
          <thead>
            <tr className="bg-white">
              {headers &&
                headers.map((header) => (
                  <th key={header} className="p-2">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr
                key={index}
                className={index % 2 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
              >
                <td className="p-2">
                  <FaEye
                    onClick={() => handleResultClick(record)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-2">{record.enrollmentId}</td>
                <td className="p-2">{record.studentName}</td>
                {record.marks.map((subject, i) => (
                  <td key={i} className="p-2">
                    {subject.marks}
                  </td>
                ))}
              </tr>
            ))}
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

export default ClsResSearch;
