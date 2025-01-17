import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { MdLocalPrintshop } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";

// Helper function to check if a date is within a range
const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date); // Convert to valid Date
  return d >= new Date(startDate) && d <= new Date(endDate);
};

// Helper function to check if a date is in the current month
const isCurrentMonth = (date) => {
  const today = new Date();
  const d = new Date(date);

  return (
    d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  );
};

const FeeReport = () => {
  // Dummy data to replicate the table
  const [initialRows, setInitialRows] = useState([]);

  const { api } = useContext(AuthContext);

  const [rows, setRows] = useState(initialRows); // Filtered data
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const getAllReceipts = async () => {
      try {
        const response = await api.get("/get_receipts/");
        // console.log(response.data);

        setInitialRows(response.data);
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllReceipts();
  }, [api]);

  // Handle search by date range
  const handleDateSearch = () => {
    if (fromDate && toDate) {
      const filteredRows = initialRows.filter((row) =>
        isDateInRange(row.date, fromDate, toDate)
      );
      setRows(filteredRows.length ? filteredRows : []);
    }
  };

  // Handle "This Month" button
  const handleThisMonthSearch = () => {
    const filteredRows = initialRows.filter((row) => isCurrentMonth(row.date));
    console.log("initialRows", initialRows);
    console.log("filteredRows", filteredRows);

    setRows(filteredRows.length ? filteredRows : []);
  };

  // Handle Enrollment ID search
  const handleIdSearch = () => {
    const filteredRows = initialRows.filter((row) =>
      row.enrollmentId.includes(searchId)
    );
    setRows(filteredRows.length ? filteredRows : []);
  };

  // Handle refresh
  const handleRefresh = () => {
    setRows(initialRows);
    setFromDate("");
    setToDate("");
    setSearchId("");
  };

  // Handle print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("fee-report-table").outerHTML; // Get the table's HTML
    const printWindow = window.open("", "", "height=500, width=800");
    printWindow.document.write("<html><head><title>Print Fee Report</title>");
    printWindow.document.write("<style>");
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
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Handle delete functionality
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      setInitialRows(
        initialRows.filter((row) => !checkedItems.includes(row.id))
      );
      setRows(rows.filter((row) => !checkedItems.includes(row.id)));

      setCheckedItems([]);

      const deleteReceipts = async () => {
        try {
          const response = await api.delete("/delete_receipt/", {
            data: checkedItems,
          });
          alert(response.data.message);
        } catch (error) {
          alert(error.data.message);
        }
      };
      deleteReceipts();
    }
  };

  //for checkbox
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // If checked, select all checkboxes
      const allChecked = rows.map((row) => row.id);
      setCheckedItems(allChecked);
    } else {
      // If unchecked, clear all selections
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      // If already checked, remove it
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      // If not checked, add it
      setCheckedItems([...checkedItems, id]);
    }
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
              <IoSearch
                className="text-gray-600 my-2 mx-4 cursor-pointer transition-colors duration-300 hover:text-blue-500 "
                size={24}
              />
            </button>
          </div>
          <span className="flex items-center justify-center  bg-white rounded-full">
            <SlCalender
              className="text-gray-600 ml-3 cursor-pointer"
              size={24}
            />
            <button
              onClick={handleThisMonthSearch}
              className="py-2 px-2 bg-transparent"
            >
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
              onChange={(e) => setSearchId(e.target.value.trim())}
              className="flex-grow px-4 py-2  placeholder-black bg-transparent focus:outline-none "
            />
            {/* Right Side: Search Icon */}
            <IoSearch
              onClick={handleIdSearch}
              className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500 "
              size={24}
            />
          </div>

          <div
            className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer"
            onClick={handleRefresh}
          >
            <FiRefreshCcw />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 mb-8">
        <MdLocalPrintshop
          size={24}
          onClick={handlePrint}
          className="cursor-pointer"
        />
        <RiDeleteBin6Line
          size={24}
          onClick={handleDelete}
          className="cursor-pointer"
        />
      </div>

      {/* Table */}
      <div className="max-w-screen-xl bg-white py-4 rounded-lg shadow-lg">
        <div className="overflow-x-auto ">
          <div className="max-h-[400px] overflow-y-auto">
            <table
              id="fee-report-table"
              className="text-center border-collapse"
            >
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th className="p-2 whitespace-nowrap min-w-[50px]">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        checkedItems.length === rows.length && rows.length > 0
                      }
                    />
                  </th>
                  {[
                    "Receipt No.",
                    "Date",
                    "Enrollment ID",
                    "Student Name",
                    "Class",

                    "Remaining Fee",
                    "Paid",
                    "Description",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="p-2 whitespace-nowrap min-w-[150px]"
                    >
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
                        index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                      }`}
                    >
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </td>
                      <td className="p-2 text-center ">{row.receiptNo}</td>
                      <td className="p-2 text-center ">{row.date}</td>
                      <td className="p-2 text-center ">{row.enrollmentId}</td>
                      <td className="p-2 text-center min-w-[200px]">
                        {row.studentName}
                      </td>
                      <td className="p-2 text-center ">{row.className}</td>

                      <td className="p-2 text-center ">{row.remainingFee}</td>
                      <td className="p-2 text-center ">
                        {row.paid} of {row.netFees}
                      </td>
                      <td className="p-2 text-center ">
                        monthly fees paid for{" "}
                        {row.months.length === 1 && row.months[0]}
                        {row.months.slice(0, -1).join(", ")}
                        {row.months.length > 1
                          ? ` and ${row.months[row.months.length - 1]}`
                          : ""}
                      </td>
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
        </div>
      </div>

      {/* Pagination Controls */}
      {/* <div className="mt-4 flex justify-between items-center pb-10">
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
            <button className="px-3">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FeeReport;
