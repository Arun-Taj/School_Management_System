import React, { useState, useRef, useEffect } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { MdLocalPrintshop } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import StatementTable from "./StatementTable";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { parse } from "date-fns";

const Statement = () => {
  const [fromDate, setFromDate] = useState(""); // Store from date
  const [toDate, setToDate] = useState(""); // Store to date
  const [filterType, setFilterType] = useState("all"); // To track "This Month" or "All" filter
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 1,
  });

  // Function to handle the search button click and filter dates
  const handleSearch = () => {
    if (fromDate && toDate) {
      setFilterType("range");
    }
  };

  // Function to handle "This Month" button click
  const handleThisMonth = () => {
    setFilterType("thisMonth");
    setPagination({ ...pagination, currentPage: 1, recordsPerPage: 10 });
  };

  // Function to reset filters when the refresh button is clicked
  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setFilterType("all");
    setPagination({
      ...pagination,
      currentPage: 1,
      recordsPerPage: 10,
    });
  };
  // Function to print only the StatementTable
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Statement</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          ${tableRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  const tableRef = useRef(); // Create a ref for the table

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
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <MdAccountBalanceWallet className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Account</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Account Statement</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row p-2 gap-4 mt-4 items-center">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-3xl p-2"
          />
          <p>To</p>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-3xl p-2"
          />

          {/* Search Button */}
          <div className="flex items-center bg-white rounded-full hover:bg-indigo-200">
            <button onClick={handleSearch}>
              <IoSearch
                className="text-gray-600 my-2 mx-4 cursor-pointer transition-colors duration-300 hover:text-blue-600 "
                size={24}
              />
            </button>
          </div>

          {/* "This Month" Button */}
          <span
            className={
              filterType == "thisMonth"
                ? "flex items-center justify-center rounded-full bg-indigo-200"
                : "flex items-center bg-white justify-center rounded-full"
            }
          >
            <SlCalender
              className="text-gray-600 ml-3 cursor-pointer"
              size={24}
              onClick={handleThisMonth}
            />
            <button
              onClick={handleThisMonth}
              className="py-2 px-2 bg-transparent"
            >
              This Month
            </button>
          </span>
        </div>

        <div className="relative flex flex-row space-x-4 items-center">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="bg-blue-500  px-2   py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105"
          >
            <MdLocalPrintshop size={24} className="text-black " />
          </button>
          <button className="bg-gray-500  px-2 py-2 rounded-md transition duration-300 hover:bg-gray-600 hover:shadow-lg hover:scale-105">
            <IoFilterSharp
              className="text-white "
              size={24}
              onClick={() => setShowFilterOptions((prev) => !prev)} // Trigger filter on click
            />
          </button>

          <button
            onClick={handleRefresh}
            className="border border-[#BCA8EA] p-2 rounded-full bg-white cursor-pointer hover:bg-[#BCA8EA] hover:text-white transition-colors duration-100"
          >
            <FiRefreshCcw size={24} className="text-gray-600 " />
          </button>
          {showFilterOptions && (
            <div className="absolute left-[-120px]">
              {/* Tooltip container */}
              <div className="relative bg-white border border-gray-300 p-2 rounded-lg shadow-lg w-40">
                {/* Filter Options */}

                {/* Filter Options */}
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("income");
                    setShowFilterOptions(false);
                  }}
                >
                  Income
                </div>
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedFilter("expense");
                    setShowFilterOptions(false);
                  }}
                >
                  Expense
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6" ref={tableRef}>
        <StatementTable
          filterType={filterType}
          fromDate={fromDate}
          toDate={toDate}
          pagination={pagination}
          setPagination={setPagination}
          selectedFilter={selectedFilter}
        />
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
  );
};

export default Statement;
