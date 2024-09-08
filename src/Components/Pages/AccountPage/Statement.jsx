import React,{useState,useRef} from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { MdLocalPrintshop } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import StatementTable from "./StatementTable";
import {IoIosArrowDropleft,IoIosArrowDropright} from 'react-icons/io'

const Statement = () => {

  const [fromDate, setFromDate] = useState(""); // Store from date
  const [toDate, setToDate] = useState(""); // Store to date
  const [filterType, setFilterType] = useState("all"); // To track "This Month" or "All" filter

  // Function to handle the search button click and filter dates
  const handleSearch = () => {
    if (fromDate && toDate) {
      setFilterType("range");
    }
  };

  // Function to handle "This Month" button click
  const handleThisMonth = () => {
    setFilterType("thisMonth");
  };

  // Function to reset filters when the refresh button is clicked
  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setFilterType("all");
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
          <div className="flex items-center bg-white rounded-full">
            <button onClick={handleSearch}>
              <IoSearch className="text-gray-600 my-2 mx-4" size={24} />
            </button>
          </div>

          {/* "This Month" Button */}
          <span className="flex items-center justify-center  bg-white rounded-full">
            <SlCalender className="text-gray-600 ml-3" size={24} onClick={handleThisMonth}/>
            <button onClick={handleThisMonth} className="py-2 px-2 bg-transparent">
              This Month
            </button>
          </span>
        </div>

        <div className="flex flex-row space-x-4 items-center">
          {/* Print Button */}
          <button onClick={handlePrint} className="bg-blue-500  px-2   py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105">
            <MdLocalPrintshop size={24} className="text-black " />
          </button>
          <button className="bg-gray-500  px-2 py-2 rounded-md transition duration-300 hover:bg-gray-600 hover:shadow-lg hover:scale-105">
            <IoFilterSharp className="text-white " size={24} />
          </button>
          
          <button onClick={handleRefresh} className="border border-[#BCA8EA] p-2 rounded-full bg-white cursor-pointer hover:bg-[#BCA8EA] hover:text-white transition-colors duration-100">
            <FiRefreshCcw size={24} className="text-gray-600 " />
          </button>
        </div>
      </div>

      <div className="pt-6" ref={tableRef}>
        <StatementTable filterType={filterType} fromDate={fromDate} toDate={toDate} />
      </div>
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

export default Statement;
