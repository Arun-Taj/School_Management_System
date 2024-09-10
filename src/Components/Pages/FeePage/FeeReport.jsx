import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { MdLocalPrintshop } from "react-icons/md";

// Helper function to check if a date is within a range
const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date.split('-').reverse().join('-')); // Convert to valid Date
  return d >= new Date(startDate) && d <= new Date(endDate);
};

// Helper function to check if a date is in the current month
const isCurrentMonth = (date) => {
  const today = new Date();
  const d = new Date(date.split('-').reverse().join('-'));
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};

const FeeReport = () => {
  // Dummy data to replicate the table
  const initialRows = [
    {
      receiptNo: '205',
      date: '14-05-2024',
      enrollmentId: '01249999',
      studentName: 'Rahul Kumar Debnath',
      class: '08',
      description: 'Monthly fee paid for - January, February and March',
      },
      {
      receiptNo: '206',
      date: '20-06-2024',
      enrollmentId: '01250000',
      studentName: 'Priya Sharma',
      class: '09',
      description: 'Quarterly fee paid for - April, May and June',
      },
      {
      receiptNo: '207',
      date: '05-07-2024',
      enrollmentId: '01250001',
      studentName: 'Aditya Chopra',
      class: '10',
      description: 'Annual fee paid for - 2024-2025',
      },
      {
      receiptNo: '208',
      date: '12-08-2024',
      enrollmentId: '01250002',
      studentName: 'Neha Gupta',
      class: '07',
      description: 'Monthly fee paid for - April, May and June',
      },
      {
      receiptNo: '209',
      date: '18-09-2024',
      enrollmentId: '01250003',
      studentName: 'Arjun Singh',
      class: '11',
      description: 'Quarterly fee paid for - July, August and September',
      },
      {
      receiptNo: '210',
      date: '22-10-2024',
      enrollmentId: '01250004',
      studentName: 'Sneha Malhotra',
      class: '06',
      description: 'Monthly fee paid for - July, August and September',
      },
      {
      receiptNo: '211',
      date: '30-11-2024',
      enrollmentId: '01250005',
      studentName: 'Rohan Kapoor',
      class: '12',
      description: 'Annual fee paid for - 2024-2025',
      },
      {
      receiptNo: '212',
      date: '08-12-2024',
      enrollmentId: '01250006',
      studentName: 'Ishita Mehta',
      class: '05',
      description: 'Monthly fee paid for - October, November and December',
      },
      {
      receiptNo: '213',
      date: '15-01-2025',
      enrollmentId: '01250007',
      studentName: 'Aman Verma',
      class: '08',
      description: 'Quarterly fee paid for - October, November and December',
      },
      {
      receiptNo: '214',
      date: '25-02-2025',
      enrollmentId: '01250008',
      studentName: 'Riya Chopra',
      class: '09',
      description: 'Monthly fee paid for - January, February and March',
      }
    // Add more rows as needed
  ];

  const [rows, setRows] = useState(initialRows); // Filtered data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchId, setSearchId] = useState('');

  // Handle search by date range
  const handleDateSearch = () => {
    if (fromDate && toDate) {
      const filteredRows = initialRows.filter(row =>
        isDateInRange(row.date, fromDate, toDate)
      );
      setRows(filteredRows.length ? filteredRows : []);
    }
  };

  // Handle "This Month" button
  const handleThisMonthSearch = () => {
    const filteredRows = initialRows.filter(row => isCurrentMonth(row.date));
    setRows(filteredRows.length ? filteredRows : []);
  };

  // Handle Enrollment ID search
  const handleIdSearch = () => {
    const filteredRows = initialRows.filter(row =>
      row.enrollmentId.includes(searchId)
    );
    setRows(filteredRows.length ? filteredRows : []);
  };

  // Handle refresh
  const handleRefresh = () => {
    setRows(initialRows);
    setFromDate('');
    setToDate('');
    setSearchId('');
  };

  // Handle print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("fee-report-table").outerHTML; // Get the table's HTML
    const printWindow = window.open('', '', 'height=500, width=800');
    printWindow.document.write('<html><head><title>Print Fee Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
      }
      th {
        background-color: #f2f2f2;
      }
    `); // Optional: Custom table styles for print
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  

  // Handle delete functionality
  const handleDelete = () => {
    setRows([]);
  };

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaMoneyBill className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Fees</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Fee Report</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-row p-2  gap-4 items-center">
          <div className="flex flex-col items-center">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 cursor-pointer"
            />
          </div>
          <p>To</p>
          <div className="flex flex-col items-center ">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 cursor-pointer"
            />
          </div>
          {/* Search Button */}
          <div className="flex items-center bg-white rounded-full">
            <button onClick={handleDateSearch}>
              <IoSearch className="text-gray-600 my-2 mx-4" size={24} />
            </button>
          </div>
          <span className="flex items-center justify-center  bg-white rounded-full">
            <SlCalender className="text-gray-600 ml-3" size={24} />
            <button onClick={handleThisMonthSearch} className="py-2 px-2 bg-transparent">
              This Month
            </button>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-row gap-4 justify-end items-center py-10">
          <div className="flex items-center  bg-white rounded-full border border-gray-400">
            <input
              type="text"
              placeholder="Enrollment Id"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-600 placeholder-black bg-transparent focus:outline-none "
            />
            {/* Right Side: Search Icon */}
            <IoSearch onClick={handleIdSearch} className="text-gray-600 mr-4 cursor-pointer" size={24} />
          </div>

          <div className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer" onClick={handleRefresh}>
            <FiRefreshCcw />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 mb-8">
        <MdLocalPrintshop size={24} onClick={handlePrint} className="cursor-pointer"/>
        <RiDeleteBin6Line size={24} onClick={handleDelete} className="cursor-pointer"/>
      </div>

      {/* Table */}
      <div className="overflow-auto max-w-full max-h-96 rounded-2xl shadow-lg">
        <table id="fee-report-table" className="min-w-full border-collapse border border-gray-300  rounded-lg overflow-hidden">
          <thead className="sticky top-0 bg-white">
            <tr>
              {['Receipt No.', 'Date', 'Enrollment ID', 'Student Name', 'Class', 'Description'].map((header, index) => (
                <th key={index} className="p-2 py-6 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className={`border border-gray-300 ${
                    index % 2 === 0 ? 'bg-[#BCA8EA]' : 'bg-[#E3D6FF]'
                  }`}
                >
                  <td className="p-2 text-center ">{row.receiptNo}</td>
                  <td className="p-2 text-center ">{row.date}</td>
                  <td className="p-2 text-center ">{row.enrollmentId}</td>
                  <td className="p-2 text-center ">{row.studentName}</td>
                  <td className="p-2 text-center ">{row.class}</td>
                  <td className="p-2 text-center ">{row.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
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
          <button className="px-3 py-2 border border-gray-400 rounded-full ">10</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">25</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">50</button>
          <p>Records per page </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600 ">Showing 1 to 25 of 78 records</div>
          <div className="flex space-x-2 items-center">
            <button className="px-3">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeReport;
