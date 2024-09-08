import React, { useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import Table from './ChartTable'

const ChartAccount = () => {
  const [rows, setRows] = useState([
    { nameOfHead: "Ram Sharma", type: "Income", action: "Subham Kumar Debnath" },
    { nameOfHead: "Sita Verma", type: "Expense", action: "Aditi Sharma" },
    { nameOfHead: "Ravi Kumar", type: "Income", action: "Vikram Singh" },
    { nameOfHead: "Anita Gupta", type: "Expense", action: "Sneha Patel" },
    { nameOfHead: "Karan Mehta", type: "Income", action: "Rohit Verma" },
    { nameOfHead: "Priya Joshi", type: "Expense", action: "Priya Gupta" },
    { nameOfHead: "Deepak Singh", type: "Income", action: "Karan Mehta" },
  ]);
  
  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [newNameOfHead, setNewNameOfHead] = useState("");
  const [newType, setNewType] = useState("");

  // Function to handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = rows.filter(
      (row) =>
        row.nameOfHead.toLowerCase().includes(value) ||
        row.type.toLowerCase().includes(value)
    );
    setFilteredRows(filtered);
  };

  // Function to handle refresh
  const handleRefresh = () => {
    setFilteredRows(rows);
    setSearchTerm(""); // Clear search term
  };

  // Function to handle delete
  const handleDelete = (index) => {
    const newRows = filteredRows.filter((_, i) => i !== index);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  // Function to add new chart of account
  const handleSaveHead = () => {
    if (newNameOfHead && newType) {
      const newRow = {
        nameOfHead: newNameOfHead,
        type: newType,
        action: "New User", // Replace with actual user if needed
      };
      const newRows = [...rows, newRow];
      setRows(newRows);
      setFilteredRows(newRows);
      setNewNameOfHead(""); // Reset the form
      setNewType("");
    }
  };

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <MdAccountBalanceWallet className="text-gray-700" />
          <span className="text-gray-700 font-medium">Account</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Chart of Account</span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">Add Chart of Account</h3>
          <input
            type="text"
            className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Name of head"
            value={newNameOfHead}
            onChange={(e) => setNewNameOfHead(e.target.value)} // Bind input to state
          />
          <select
            className="p-3 px-4 rounded-3xl bg-white mt-4 border border-blue-500 w-2/3"
            value={newType}
            onChange={(e) => setNewType(e.target.value)} // Bind select to state
          >
            <option value="" disabled selected>
              Type
            </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <button
            className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-4 font-bold mb-16"
            onClick={handleSaveHead}
          >
            Save Head
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 py-10 justify-end">
            <div className="flex items-center bg-white rounded-full">
              <IoFilterSharp className="text-gray-600 ml-4" size={24} />
              <div className="w-px h-6 bg-gray-600 mx-4"></div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
              />
              <IoSearch className="text-gray-600 mr-4" size={24} />
            </div>
            <div className="bg-white p-3 rounded-full border border-[#BCA8EA] cursor-pointer" onClick={handleRefresh}>
              <FiRefreshCcw />
            </div>
          </div>
          <Table rows={filteredRows || []} onDelete={handleDelete} />

        </div>
      </div>
    </div>
  );
};

export default ChartAccount;
