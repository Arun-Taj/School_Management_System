import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Table = ({ rows = [], handleDelete }) => {
  useEffect(() => {
    setPagination({
      ...pagination,
      totalRecords: rows.length,
      totalPages: Math.ceil(rows.length / pagination.recordsPerPage),
    });
  }, [rows]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 1,
  });
  const [filteredRows, setFilteredRows] = useState([]);

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
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 py-6">Name of Head</th>
              <th className="p-2 py-6">Type</th>
              <th className="p-2 py-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No data found
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
                  <td className="p-2 text-center">{row.head}</td>
                  <td className="p-2 text-center">{row.type}</td>
                  <td className="p-2 text-center">
                    <button
                      className="p-1 text-black transition-colors duration-300 hover:bg-red-600 hover:text-white"
                      onClick={() => handleDelete(row.id)}
                    >
                      <RiDeleteBin6Line className="hover:text-lg" />
                    </button>
                  </td>
                </tr>
              ))
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

export default Table;
